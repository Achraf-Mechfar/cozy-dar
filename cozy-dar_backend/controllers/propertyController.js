const pool = require('../models/cozydar');
const uploadImages = require('./cloudinary');
const { available_from, check_availability_core } = require('./reservation');
const { set_role_owner } = require('./userController');

const set_status_listed=async (client,request_id)=>{
  const update_query=await client.query('update property_requests set status=$1 where request_id=$2',['listed',request_id])
  return update_query;
}

const add_house = async (req,res) =>{
    const client=await pool.connect()
    try{
        const {title,property_type,owner_id,location,units,request_id,lat,lng,distance}=req.body;
        await client.query('BEGIN');
        console.log(location)
        const location_id=await client.query('select location_id from locations where city=$1 and district=$2',[location.city,location.district])
        console.log(location_id.rows[0])
        const add_prop_query=await client.query('insert into property(title,property_type,owner_id,location_id,lat,lng,distance_from_beach) values ($1,$2,$3,$4,$5,$6,$7) returning *',[title,property_type,owner_id,location_id.rows[0].location_id,lat,lng,distance])
        console.log(add_prop_query.rows[0])
        const property_id=add_prop_query.rows[0].property_id
        let rooms_list=[]
        for(let unit of units){
            if (!unit.title){
              unit.title=title
            }
            rooms_list.push(unit.bedrooms)
            const image_urls=await uploadImages(unit.images)
            console.log(image_urls)
            const add_unit_query=await client.query('insert into units (property_id,price_per_night,rooms,bathrooms,unit_title,image_urls,virtual_tour_url) values ($1,$2,$3,$4,$5,$6,$7) returning *',[property_id,unit.price_per_night,unit.bedrooms,unit.bathrooms,unit.title,image_urls,unit.virtualTour])
            const unit_id=add_unit_query.rows[0].unit_id
            for (let amenity_id of unit.amenities) {
              await client.query('INSERT INTO unit_amenities (unit_id, amenity_id) VALUES ($1, $2)',[unit_id, amenity_id]);
            }
        }
        if (property_type=='Residence'){
          const prices=units.map(unit=>unit.price_per_night)
          const min_price=Math.min(...prices)
          const max_price=Math.max(...prices)
          rooms_list =[...new Set(rooms_list)].sort((a, b) => a - b);
          console.log(rooms_list,min_price,max_price)
          const add_residence_query=await client.query('insert into residence(property_id,rooms,min_price,max_price) values ($1,$2,$3,$4)',[property_id,rooms_list,min_price,max_price])
        }
        await set_status_listed(client,request_id)
        const set_owner=await set_role_owner(client,owner_id)
        if(!set_owner){
          await client.query('ROLLBACK');
          res.status(500).send('Error while setting owner role')
        }
        await client.query('COMMIT');
        console.log('house added');
        res.send('house added')
    }catch(err){
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).send('Error while adding house');
    }finally{
        client.release()
    }
}

/*const get_unit = async(req,res)=>{
  const { id } = req.params;
  try{
    const result = await pool.query('select * from units u join property p on u.property_id = p.property_id')
  }
}*/
const get_properties_card = async (req, res) => {
  const { price_range, rooms, type, check_in, check_out, distance_range, search } = req.query;

  try {
    let conditions = [];
    let unitConditions = [];
    let values = [];
    let paramIndex = 1;

    if (price_range) {
      const [min, max] = price_range.split(',').map(Number);
      unitConditions.push(`u.price_per_night BETWEEN $${paramIndex++} AND $${paramIndex++}`);
      values.push(min, max);
    }

    if (rooms) {
      unitConditions.push(`u.rooms = $${paramIndex}`);
      values.push(Number(rooms));
      paramIndex++;
    }

    if (check_in && check_out) {
      unitConditions.push(`
        u.unit_id NOT IN (
          SELECT r.unit_id
          FROM reservations r
          WHERE r.status IN ('confirmed', 'initial_confirmed')
            AND (
              (r.check_in BETWEEN $${paramIndex} AND $${paramIndex + 1})
              OR (r.check_out BETWEEN $${paramIndex} AND $${paramIndex + 1})
              OR (r.check_in < $${paramIndex} AND r.check_out > $${paramIndex + 1})
            )
        )
      `);
      values.push(check_in, check_out);
      paramIndex += 2;
    }

    let unitFilterSQL = unitConditions.length > 0 ? `AND ${unitConditions.join(' AND ')}` : '';

    let query = `
      SELECT p.*, l.*, r.*, p.property_id,
        (
          SELECT json_agg(u)
          FROM units u
          WHERE u.property_id = p.property_id ${unitFilterSQL}
        ) AS units
      FROM property p
      JOIN locations l ON p.location_id = l.location_id
      LEFT JOIN residence r ON p.property_id = r.property_id
      WHERE (
        SELECT COUNT(*)
        FROM units u
        WHERE u.property_id = p.property_id ${unitFilterSQL}
      ) > 0
    `;

    if (type) {
      conditions.push(`p.property_type = $${paramIndex}`);
      values.push(type);
      paramIndex++;
    }
    if (search) {
      conditions.push(`(similarity(p.title, $${paramIndex})>=0.5 OR similarity(l.city, $${paramIndex})>=0.5 OR similarity(l.district, $${paramIndex})>=0.5)`);
      values.push(`%${search}%`);
      paramIndex++;
    }

    if (distance_range) {
      const [min_d, max_d] = distance_range.split(',').map(Number);
      conditions.push(`p.distance_from_beach BETWEEN $${paramIndex++} AND $${paramIndex++}`);
      values.push(min_d, max_d);
      paramIndex += 2;
    }

    if (conditions.length > 0) {
      query += ` AND ${conditions.join(' AND ')}`;
    }

    const result = await pool.query(query, values);
    console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching property:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const get_properties = async (req, res) => {
  const { search } = req.query;
  try {
    let query = `
      SELECT p.*, 
             l.*,
             us.full_name,
             usa.phone,
            (SELECT json_agg(u.*) FROM units u 
            WHERE u.property_id = p.property_id) AS units


      FROM property p 
      JOIN locations l ON p.location_id = l.location_id
      JOIN users us on p.owner_id=us.user_id
      JOIN user_auth usa on p.owner_id=usa.user_id
      LEFT JOIN residence r ON p.property_id = r.property_id
    `;
    
    let queryParams = [];
    
    if (search && search.trim() !== "") {
      const searchTerm = `%${search}%`;
      query += `
        WHERE (p.title ILIKE $1
        OR p.property_id::text ILIKE $1
        OR us.full_name ILIKE $1
        OR usa.phone ILIKE $1
        OR l.city ILIKE $1
        OR l.district ILIKE $1)
        
      `;
      queryParams.push(searchTerm);
    }
    
    query += " ORDER BY p.added_at DESC";
    
    const result = await pool.query(query, queryParams);
    
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.json({ message: "No properties found" });
    }
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const get_property=async (property_id)=>{
  const result =await pool.query('select * from property p join locations l on p.location_id=l.location_id where property_id=$1',[property_id]);
  return result.rows[0]
}

const get_unit=async (unit_id)=>{
  const result =await pool.query('select * from units where unit_id=$1',[unit_id]);
  return result.rows[0]
}

const get_amenities=async (unit_id)=>{
  const result =await pool.query('select * from unit_amenities u join amenity a on u.amenity_id=a.amenity_id where u.unit_id=$1',[unit_id])
  return result.rows
}

const get_full_unit = async(req,res)=>{
  const { unit_id } = req.params;
  try{
    console.log(unit_id)
    const unit=await get_unit(unit_id);
    console.log(unit)
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    const property=await get_property(unit.property_id);
    console.log(property)
    const amenities=await get_amenities(unit_id);
    console.log(amenities)
    res.json({
      unit,
      property,
      amenities
    });
  } catch (error) {
    console.error('Error fetching unit details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const get_residence=async (req,res)=>{
  const { property_id } = req.params;
  try{
    const result =await pool.query('select *,(SELECT json_agg(u) FROM units u WHERE u.property_id = p.property_id) AS units from property p join residence r on p.property_id=r.property_id join locations l on p.location_id=l.location_id where r.property_id=$1',[property_id])
    console.log(result.rows[0])
    res.json(result.rows[0])
  }catch(error){
    console.error('Error fetching unit details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const add_request=async(req,res)=>{
    const {user_id,propertyType,location,property_title,description,phone,units}=req.body;
    const client=await pool.connect()
    try{
      client.query('BEGIN')
      const prop_request= await client.query('insert into property_requests(owner_id,property_type,location,property_title,description) values ($1,$2,$3,$4,$5) returning *',[user_id,propertyType,location,property_title,description])
      const request_id=prop_request.rows[0].request_id
      for (let unit of units) {
        await client.query('insert into unit_requests (request_id, title, bedrooms, bathrooms, price_per_night, amenities) values ($1, $2, $3, $4, $5, $6)',[request_id, unit.title, unit.bedrooms, unit.bathrooms, unit.price, unit.amenities]);
      }
      if(phone!=''){
        const add_phone=await client.query('update user_auth set phone=$1 where user_id=$2',[phone,user_id])
      }
      await client.query('COMMIT')
      console.log('request added')
      res.send('request added')
    }catch(err){
      await client.query('ROLLBACK')
      console.error(err)
      res.status(500).send('Error while adding request')
    }finally{
      client.release()
    }
  }

const My_Requests=async(req,res)=>{
  const { userId } = req.params;
  try{
    console.log(userId)
    console.log('aaaaaa')
      const result=await pool.query('SELECT *,(SELECT json_agg(u) FROM unit_requests u WHERE u.request_id = p.request_id) AS unit_requests FROM property_requests p where owner_id=$1',[userId]);
      if (result.rows.length > 0) {
          res.json(result.rows);
        } else {
          res.json({ message: "No data" });
        }
    
  }catch(err){
      
      console.error(err);
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
}

const addFavorite = async (req, res) => {
  const { user_id, target_id, target_type } = req.body;

  try {
    await pool.query('INSERT INTO favorites (user_id, target_id, target_type) VALUES ($1, $2, $3)',[user_id, target_id, target_type]);
    res.status(200).json({ message: 'Added to favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const removeFavorite = async (req, res) => {
  const { user_id, target_id, target_type } = req.body;

  try {
    await pool.query('DELETE FROM favorites WHERE user_id = $1 AND target_id = $2 AND target_type = $3', [user_id, target_id, target_type]);
    res.status(200).json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
const getFavorites_ids=async(req,res)=>{
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT target_id,target_type FROM favorites WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `
      SELECT p.*, 
      (
        SELECT json_agg(u)
        FROM units u
        WHERE u.property_id = p.property_id
      ) AS units,
      r.*,
      l.*
      FROM property p 
      LEFT JOIN residence r ON p.property_id = r.property_id 
      JOIN locations l ON p.location_id = l.location_id
      JOIN favorites f ON 
        (f.target_type = 'residence' AND p.property_id = f.target_id) OR
        (f.target_type = 'unit' AND p.property_id IN (SELECT property_id FROM units WHERE unit_id = f.target_id))
      WHERE f.user_id = $1
      GROUP BY p.property_id, r.property_id, l.location_id
    `;
    console.log(userId)
    const result = await pool.query(query, [userId]);
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const myproperties=async(req,res)=>{
  const { userId } = req.params;
  try{
    console.log(userId)
    console.log('aaaaaa')
      const result=await pool.query('SELECT *,(SELECT json_agg(u) FROM units u WHERE u.property_id = p.property_id) AS units from property p left join residence r on p.property_id=r.property_id join locations l on p.location_id=l.location_id where p.owner_id=$1',[userId]);
      console.log(result.rows)
      console.log(result.rows.length)
      if (result.rows.length > 0) {
          res.json(result.rows);
        } else {
          res.json({ message: "No data" });
        }
    
  }catch(err){
      
      console.error(err);
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
}

const get_owner_id=async(reservation_id)=>{
  try{
    const result=await pool.query('select owner_id from property p join units u on p.property_id=u.property_id join reservations r on u.unit_id=r.unit_id where r.reservation_id=$1',[reservation_id]);
    return result.rows[0].owner_id;
  }catch(err){
    console.error(err);
    return null;
  }
}

const get_user_units=async(user_id)=>{
    try{

        const result=await pool.query('select unit_id from units u join property p on u.property_id=p.property_id join users us on us.user_id=p.owner_id where us.user_id=$1',[user_id]);
        console.log(result.rows)
        console.log(result.rows.length)
        if (result.rows.length > 0) {
            return result.rows;
          } else {
            return [];
          }
      
    }catch(err){
        
        console.error(err);
        console.log(err);
        throw err;
    }
}


module.exports = {add_house,get_properties,get_full_unit,My_Requests,add_request,addFavorite,get_residence,myproperties,get_properties_card,getFavorites,removeFavorite,getFavorites_ids,get_owner_id,get_user_units}
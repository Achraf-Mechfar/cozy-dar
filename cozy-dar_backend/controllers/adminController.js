const pool = require('../models/cozydar');
const { sendMail_Initial_Approved } = require('../middlewares/nodemailer');
const { addIncome_core,addExpense_core }=require('./earnings');
const {get_owner_id}=require('./propertyController');
const {add_to_balance_core,deduct_from_balance_core}=require('./BalanceController');

const Prop_Request=async(req,res)=>{
    const { status } = req.query;
    try{
        const result=await pool.query('SELECT   *,(SELECT json_agg(ur) FROM unit_requests ur WHERE ur.request_id = p.request_id) AS unit_requests FROM property_requests p JOIN user_auth ua ON p.owner_id = ua.user_id JOIN users u ON p.owner_id = u.user_id where status=$1',[status]);
        if (result.rows.length > 0) {
            res.json(result.rows);
          } else {
            res.json({ message: "No data" });
          }
          
    }catch(err){
        
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const initial_approval = async (req, res) => {
  const { request_id, meet_date, email } = req.body;
  try {
    const result = await pool.query("UPDATE property_requests SET meeting_date = $1, status = 'initial_approved' WHERE request_id = $2",[meet_date, request_id]);
    sendMail_Initial_Approved(email)
    res.send('Approved!');
    
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const reservations = async (req, res, tableName) => {
  const { search } = req.query;
  try {
    let query = `
      SELECT *,(select full_name from users where user_id=p.owner_id) AS owner_name,
      (select json_agg(a.*) from unit_amenities ua join amenity a on ua.amenity_id=a.amenity_id where ua.unit_id=r.unit_id) AS amenities
      FROM ${tableName} r 
      JOIN units u ON r.unit_id = u.unit_id 
      JOIN property p ON u.property_id = p.property_id 
      JOIN locations l ON p.location_id = l.location_id 
      JOIN users us ON r.user_id = us.user_id
      WHERE r.b_checkin='false' AND r.b_checkout='false'
    `;
    let queryParams = [];
    if (search && search.trim() !== "") {
      const searchTerm = `%${search.replace(/\s+/g, '')}%`;
      query += `
        AND (CAST(r.unit_id AS TEXT) ILIKE $1 
        OR CAST(r.user_id AS TEXT) ILIKE $1
        OR replace(u.unit_title, ' ', '') ILIKE $1 
        OR replace(p.title, ' ', '') ILIKE $1 
        OR replace(l.city, ' ', '') ILIKE $1 
        OR replace(l.district, ' ', '') ILIKE $1 
        OR replace(us.full_name, ' ', '') ILIKE $1 
      )`;
      queryParams.push(searchTerm);
    }
    
    query += " ORDER BY r.check_in";
    
    const result = await pool.query(query, queryParams);
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.json({ message: "No data" });
    }
  } catch (err) {
    console.error('Error in upcoming_reservations:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const upcoming_reservations = (req, res) => reservations(req, res, 'reservations');
const reservations_history = (req, res) => reservations(req, res, 'reservations_history');

const ongoing_reservations = async (req, res) => {
  const { search } = req.query;
  try {
    let query = `
      SELECT *,(select full_name from users where user_id=p.owner_id) AS owner_name,
      (select json_agg(a.*) from unit_amenities ua join amenity a on ua.amenity_id=a.amenity_id where ua.unit_id=r.unit_id) AS amenities
      FROM reservations r 
      JOIN units u ON r.unit_id = u.unit_id 
      JOIN property p ON u.property_id = p.property_id 
      JOIN locations l ON p.location_id = l.location_id 
      JOIN users us ON r.user_id = us.user_id
      WHERE r.b_checkin='true' AND r.b_checkout='false'
    `;
    let queryParams = [];
    if (search && search.trim() !== "") {
      const searchTerm = `%${search.replace(/\s+/g, '')}%`;
      query += `
         AND (CAST(r.unit_id AS TEXT) ILIKE $1 
        OR CAST(r.user_id AS TEXT) ILIKE $1)
        OR replace(u.unit_title, ' ', '') ILIKE $1 
        OR replace(p.title, ' ', '') ILIKE $1 
        OR replace(l.city, ' ', '') ILIKE $1 
        OR replace(l.district, ' ', '') ILIKE $1 
        OR replace(us.full_name, ' ', '') ILIKE $1)
      `;
      queryParams.push(searchTerm);
    }
    
    query += " ORDER BY r.check_in";
    
    const result = await pool.query(query, queryParams);
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.json({ message: "No data" });
    }
  } catch (err) {
    console.error('Error in upcoming_reservations:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update_reservation = async (req, res) => {
    const { reservation_id, status, payment_status, paid_amount } = req.body;
    const client=await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        "UPDATE reservations SET status = $1, payment_status = $2, paid_amount = $3 WHERE reservation_id = $4 RETURNING *",
        [status, payment_status, paid_amount, reservation_id]
      );
      if(result.rowCount===0){
        res.status(404).send('Reservation not found');
      }
      const owner_id=await get_owner_id(reservation_id);
      const payment = await client.query("SELECT * FROM income WHERE reservation_id = $1", [reservation_id]);
      if(payment.rowCount===0){
        if(payment_status==='advance paid'){
            await addIncome_core(client,result.rows[0].unit_id,reservation_id,'Advance',paid_amount);
        }else if(payment_status==='paid'){
            await addIncome_core(client,result.rows[0].unit_id,reservation_id,'Full',paid_amount);
        }

      }else{
        if(payment_status==='advance paid'){
            await client.query('DELETE FROM income WHERE reservation_id = $1', [reservation_id]);
            await client.query('DELETE FROM expenses WHERE reservation_id = $1', [reservation_id]);
            const deduct=await deduct_from_balance_core(client,owner_id,paid_amount*0.9);
            if(!deduct){
              await client.query('ROLLBACK');
              res.status(500).send('Error while deducting from balance');
            }
            await addIncome_core(client,result.rows[0].unit_id,reservation_id,'Advance',paid_amount);
        }else if(payment_status==='paid'){
            await addIncome_core(client,result.rows[0].unit_id,reservation_id,'Remaining',paid_amount);
        }
      }
      const add_expense=await addExpense_core(client,result.rows[0].unit_id,reservation_id,'Platform Fee',paid_amount*0.1,'10%');
      if(!add_expense){
        await client.query('ROLLBACK');
        res.status(500).send('Error while adding expense');
      }
      const add_balance=await add_to_balance_core(client,owner_id,paid_amount*0.9);
      if(!add_balance){
        await client.query('ROLLBACK');
        res.status(500).send('Error while adding to balance');
      }
      await client.query('COMMIT');
      res.send('Reservation updated!');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(err);
      res.status(500).send(err);
    }finally{
      client.release();
    }
  };

  const check_in=async(req,res)=>{
    try{
      const {reservation_id}=req.params;
      const check_in_query=await pool.query("update reservations set b_checkin='true' where reservation_id=$1",[reservation_id])
      res.status(200).send('Reservation checked in!')
    }catch(err){
      console.error(err)
      res.status(500).send('Error while checking in')
    }
  }

  const check_out=async(req,res)=>{
    try{
      const {reservation_id}=req.params;
      const check_out_query=await pool.query("update reservations set b_checkout='true' where reservation_id=$1",[reservation_id])
      res.status(200).send('Reservation checked out!')
    }catch(err){
      console.error(err)
      res.status(500).send('Error while checking out')
    }
  }

  const Regular_Users=async(req,res)=>{
    try{
      const result=await pool.query("SELECT u.*,ua.* FROM users u join user_auth ua on u.user_id=ua.user_id where u.user_role='visitor'")
      res.json(result.rows)
    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal Server Error'})
    }
  }

  const Property_Owners=async(req,res)=>{
    try{
      const result=await pool.query("SELECT u.*,ua.* FROM users u join user_auth ua on u.user_id=ua.user_id where u.user_role='owner'")
      res.json(result.rows)
    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal Server Error'})
    }
  }

  const Admins=async(req,res)=>{
    try{
        const result=await pool.query("SELECT u.*,ua.* FROM users u join user_auth ua on u.user_id=ua.user_id where u.user_role='admin'")
        res.json(result.rows)
    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal Server Error'})
    }
  }

  const platform_finance=async(req,res)=>{
    const client=await pool.connect();
    try{
        const total_income=await client.query("SELECT sum(amount) as total_income FROM income")
        const total_expenses=await client.query("SELECT sum(current_balance+total_payouts) as total_expenses FROM user_balance")
        const total_re_unre_expenses=await client.query("SELECT sum(total_payouts) as total_released_expenses, sum(current_balance) as total_unreleased_expenses FROM user_balance")
        const net_profit=parseFloat(total_income.rows[0].total_income-total_expenses.rows[0].total_expenses).toFixed(2);
        const platform_balance=total_income.rows[0].total_income-total_re_unre_expenses.rows[0].total_released_expenses;
        res.json({total_income:total_income.rows[0].total_income,total_expenses:total_expenses.rows[0].total_expenses,total_released_expenses:total_re_unre_expenses.rows[0].total_released_expenses,total_unreleased_expenses:total_re_unre_expenses.rows[0].total_unreleased_expenses,net_profit,platform_balance})
    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal Server Error'})
    }finally{
        client.release();
    }
  }
  const get_daily_analytics=async(req,res)=>{
    try{
        const result=await pool.query("SELECT * FROM daily_analytics_view")
        console.log(result.rows)
        res.json(result.rows)
    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal Server Error'})
    }
  }

module.exports = {Prop_Request,initial_approval,upcoming_reservations,reservations_history,update_reservation,Regular_Users,Property_Owners,Admins,platform_finance,get_daily_analytics,check_in,check_out,ongoing_reservations};
const pool = require('../models/cozydar');
const dayjs = require('dayjs');

const available_from=async (req,res)=>{
    const {unit_id}=req.body
    const available_from=await pool.query('select available_from from units where unit_id=$1',[unit_id])
    res.json(available_from.rows[0])
}

const check_availability=async(req,res)=>{
    let {unit_id,check_in,check_out}=req.body
    check_in=dayjs(check_in).add(1,'hour')
    check_out=dayjs(check_out).add(1,'hour')
    try{
        console.log(unit_id,dayjs(check_in).format('YYYY-MM-DD HH:mm'),dayjs(check_out).format('YYYY-MM-DD HH:mm'))
        const availability=await check_availability_core({unit_id,check_in,check_out})
        console.log(await check_availability_core({unit_id,check_in,check_out}))
        console.log('availability: ',availability)
        res.json(availability)
    }
    catch(err){
        console.error(err)
        res.status(500).send('Error while checking availability')
    }
}
const check_availability_core=async ({unit_id,check_in,check_out})=>{
    console.log(unit_id,dayjs(check_in).format('YYYY-MM-DD HH:mm'),dayjs(check_out).format('YYYY-MM-DD HH:mm'))
    const availability=await pool.query("select * from reservations where unit_id=$1 and status in ('confirmed','initial_confirmed') and ((check_in between $2 and $3 or check_out between $2 and $3) or (check_in < $2 and check_out > $3))",[unit_id,check_in,check_out])
    if(availability.rows.length>0){
        console.log('core: not available')
        return false
    }else{
        console.log('core: available')
        return true
    }
}
const my_reservations=async (req,res)=>{
    const {userId}=req.params
    const reservations=await pool.query('select * from reservations r join units u on r.unit_id=u.unit_id where r.user_id=$1 order by check_in',[userId])
    console.log(reservations.rows)
    console.log(userId)
    console.log(reservations.rows.length)
    res.json(reservations.rows)
}

const reservations_history=async (req,res)=>{
    const {userId}=req.params
    const reservations=await pool.query('select * from reservations_history r join units u on r.unit_id=u.unit_id where r.user_id=$1 order by check_in',[userId])
    console.log(reservations.rows)
    console.log(userId)
    console.log(reservations.rows.length)
    res.json(reservations.rows)
}

const get_reservations_core=async (client,unit_id)=>{
    const reservation=await client.query("select * from reservations where unit_id=$1 and status in ('confirmed','initial_confirmed') order by check_in",[unit_id])
    return reservation.rows
}

const get_reservations=async (req,res)=>{
    const {unit_id}=req.params
    const client=await pool.connect()
    try{
        console.log('unit_id: ',unit_id)
        const reservation=await get_reservations_core(client,unit_id)
        console.log('reservation: ',reservation)
        console.log('aaa')
        res.json(reservation)
    }
    catch(err){
        console.error(err)
        res.status(500).send('Error while getting reservations')
    }
    finally{
        client.release()
    }

}

const add_reservation=async (req,res)=>{
    const client=await pool.connect()
    try{
        let {unit_id,user_id,check_in,check_out,msg,total_price,phone}=req.body
        check_in=dayjs(check_in).add(1,'hour')
        check_out=dayjs(check_out).add(1,'hour')
        console.log(check_in,check_out)
        console.log(unit_id,check_in,check_out)
        const availability=await check_availability_core({unit_id,check_in,check_out})
        if(!availability){
            res.status(409).json({message:'Not available at this date'})
            return;
        }
        await client.query('BEGIN')
        console.log(user_id,phone)
        /*const get_phone=await client.query('select phone from user_auth where user_id=$1',[user_id])
        if(get_phone.rows[0].phone==null){
            await client.query('update user_auth set phone=$1 where user_id=$2',[phone,user_id])
        }*/
        const reservation=await client.query('insert into reservations (unit_id,user_id,check_in,check_out,msg,price) values ($1,$2,$3,$4,$5,$6) returning *',[unit_id,user_id,check_in,check_out,msg,total_price])
        console.log('added')
        /*await set_available_from(client,unit_id)*/
        console.log('reservation added')
        res.status(201).json({message:'Reservation added successfully, we will contact you as soon as possible !'})
        await client.query('COMMIT')
    }catch(err){
        await client.query('ROLLBACK')
        console.error(err)
        res.status(500).json({message:'Error while adding reservation'})
    }
    finally{
        client.release()
    }
}

const set_available_from=async (client,unit_id)=>{
    const reservations=await get_reservations_core(client,unit_id)
    if(dayjs(reservations[0].check_in).isBefore(dayjs().add(1,'day'))){
        for(var i=0;i<reservations.length-1;i++){
            if(dayjs(reservations[i+1].check_in).diff(dayjs(reservations[i].check_out), 'hour') > 24){
                const update_available_from=await client.query('update units set available_from=$1 where unit_id=$2',[reservations[i].check_out,unit_id])
                return;
            }
        }
        const update_available_from=await client.query('update units set available_from=$1 where unit_id=$2',[reservations[i].check_out,unit_id])
        return;
    }else{
        const update_available_from=await client.query('update units set available_from=$1 where unit_id=$2',[null,unit_id])
        return;
    }
}
module.exports={check_availability,available_from,add_reservation,get_reservations,set_available_from,check_availability_core,my_reservations,reservations_history}

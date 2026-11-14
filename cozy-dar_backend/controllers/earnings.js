const pool = require('../models/cozydar');
const { get_user_units } = require('./propertyController');

/*const addIncome=async(req,res)=>{
    try{
        const {unit_id,reservation_id,payment_stage,amount}=req.body;
        const result=await addIncome_core(unit_id,reservation_id,payment_stage,amount);
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }
}*/

const addIncome_core=async(client,unit_id,reservation_id,payment_stage,amount)=>{
    try{
        const result=await client.query('INSERT INTO income (unit_id,reservation_id,payment_stage,amount) VALUES ($1,$2,$3,$4) RETURNING *',[unit_id,reservation_id,payment_stage,amount]);
        return result.rows[0];
    }catch(err){
        console.error(err);
        return null;
    }
}
const getIncome_core=async(client,unit_id)=>{
    try{
        const result=await client.query('SELECT i.*,r.check_in,r.check_out, (SELECT SUM(amount) FROM income WHERE unit_id=$1) as total_income FROM income i JOIN reservations r ON i.reservation_id=r.reservation_id WHERE i.unit_id=$1',[unit_id]);
        return result.rows;
    }catch(err){
        console.error(err);
        return null;
    }
}
const getIncome=async(req,res)=>{
    const unit_id=req.params.unit_id;
    const client=await pool.connect();
    try{
        const result=await getIncome_core(client,unit_id);
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }finally{
        client.release();
    }
}

const addExpense_core=async(client,unit_id,reservation_id,exp_type,amount,note='')=>{
    try{
        const result=await client.query('INSERT INTO expenses (unit_id,reservation_id,exp_type,amount,note) VALUES ($1,$2,$3,$4,$5) RETURNING *',[unit_id,reservation_id,exp_type,amount,note]);
        return result.rows[0];
    }catch(err){
        console.error(err);
        return null;
    }
}

/*const addExpense=async(req,res)=>{
    try{
        const {unit_id,reservation_id,exp_type,amount,note}=req.body;
        const result=await addExpense_core(unit_id,reservation_id,exp_type,amount,note);
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }
}*/
const getExpense_core=async(client,unit_id)=>{
    try{
        const result=await client.query('SELECT e.*, (SELECT SUM(amount) FROM expenses WHERE unit_id=$1) as total_expenses FROM expenses e WHERE e.unit_id=$1',[unit_id]);
        return result.rows;
    }catch(err){
        console.error(err);
        return null;
    }
}
const getExpense=async(req,res)=>{
    const unit_id=req.params.unit_id;
    const client=await pool.connect();
    try{
        const result=await getExpense_core(client,unit_id);
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }finally{
        client.release();
    }
}

const get_user_income=async(req,res)=>{
    const user_id=req.params.user_id;
    const client=await pool.connect();
    try{
        const units=await get_user_units(user_id);
        let total_income=0;
        for(let unit of units){
            const income=await getIncome_core(client,unit.unit_id);
            total_income+=parseFloat(income[0].total_income);
        }
        console.log(total_income)
        res.json({total_income});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }finally{
        client.release();
    }
}

const get_user_expenses=async(req,res)=>{
    const user_id=req.params.user_id;
    const client=await pool.connect();
    try{
        const units=await get_user_units(user_id);
        let total_expenses=0;
        for(let unit of units){
            const expense=await getExpense_core(client,unit.unit_id);
            total_expenses+=parseFloat(expense[0].total_expenses);
        }
        res.json({total_expenses});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }finally{
        client.release();
    }
}

module.exports = { getIncome, getExpense, addIncome_core, addExpense_core,get_user_income,get_user_expenses };

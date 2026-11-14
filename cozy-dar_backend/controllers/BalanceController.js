const pool = require('../models/cozydar');

const add_to_balance_core=async(client,user_id,amount)=>{
    try{
        const result=await client.query('update user_balance set current_balance=current_balance+$1 where user_id=$2',[amount,user_id]);
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

const deduct_from_balance_core=async(client,user_id,amount)=>{
    try{
        await client.query('BEGIN');
        const result=await client.query('update user_balance set current_balance=current_balance-$1 where user_id=$2',[amount,user_id]);
        if(result.rowCount===0){
            return false;
        }else if(result.rows[0].current_balance<0){
            return false;
        }else{
            await client.query('COMMIT');
            return true;
        }
    }catch(err){
        await client.query('ROLLBACK');
        console.error(err);
        return false;
    }finally{
        client.release();
    }
}

const get_balance=async(req,res)=>{
    const {user_id}=req.params;
    try{
        const result=await pool.query('select * from user_balance where user_id=$1',[user_id]);
        res.json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }
}

const get_payouts=async(req,res)=>{
    const {user_id}=req.params;
    try{
        const result=await pool.query('select * from payouts where user_id=$1 order by payout_date',[user_id]);
        res.json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }
}
module.exports={add_to_balance_core,deduct_from_balance_core,get_balance,get_payouts}

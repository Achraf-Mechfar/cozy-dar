const pool = require('../models/cozydar');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



const signup = async (req,res) =>{
    const client=await pool.connect()
    try{
        const {fullname,email,password,phone}=req.body;
        await client.query('BEGIN');
        const signup_query=await client.query('insert into users(full_name) values ($1) returning *',[fullname])  
        console.log(signup_query.rows[0]);
        const user_id=signup_query.rows[0].user_id;
        console.log(user_id);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const auth_query=await client.query('insert into user_auth values ($1,$2,$3,$4)',[user_id,email,hashedPassword,phone])
        await client.query('COMMIT');
        console.log('user added');
        res.send('user added')
    }catch(err){
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).send('Error while adding user');
    }finally{
        client.release()
    }
}
const add_phone_number_core=async (client,user_id,phone)=>{
    try{
        const add_phone_query=await client.query('update user_auth set phone=$1 where user_id=$2',[phone,user_id])
        console.log('phone number added');
        return 'phone number added'
    }catch(err){
        console.error(err);
        return 'Error while adding phone number'
    }
}
const add_phone_number=async (req,res)=>{
    const client=await pool.connect()
    try{
        const {user_id,phone}=req.body;
        await add_phone_number_core(client,user_id,phone)
        console.log('phone number added');
        res.send('phone number added')
    }catch(err){
        console.error(err);
        res.status(500).send('Error while adding phone number');
    }finally{
        client.release()
    }
}
const login = async(req,res) =>{
    const client= await pool.connect();
    try{
        const {log_info,password}=req.body;
        const login_query=await client.query('select * from user_auth ua join users u on ua.user_id=u.user_id where email=$1 or phone=$1',[log_info])
        const user = login_query.rows[0]
        if (!user) {
            return res.status(401).json({ message: 'Invalid email/phone or password.' });
        }
        const hashedPassword = user.password;
        const result = await bcrypt.compare(password, hashedPassword);
        if (result) {
            const token = jwt.sign({ userId: user.user_id, email: user.email , role: user.user_role, phone: user.phone}, process.env.JWT_SECRET, { expiresIn: '1w' });
            res.json({ token, fullname: user.full_name});
        } else {
            res.send({'message':'Invalid email/phone or password.'})
            console.log('verify ur info')
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Error while logging in');
    }
    finally{
        client.release()
    }
}

const set_user_role_core=async (client,user_id,role)=>{
    try{
        const set_role_query=await client.query('update users set user_role=$1 where user_id=$2',[role,user_id])
        console.log('user role set');
        return 'user role set'
    }catch(err){
        console.error(err);
        return 'Error while setting user role'
    }
}

const set_role_owner=async(client,owner_id)=>{
    try{
        const user=await client.query('select user_role from users where user_id=$1',[owner_id])
        if(user.rows[0].user_role=='owner'){
            return true
        }
        const set_role_query=await client.query("update users set user_role='owner' where user_id=$1",[owner_id])
        const insert_balance_query=await client.query("insert into user_balance (user_id,current_balance) values ($1,0)",[owner_id])
        return true
    }catch(err){
        console.error(err);
        return false
    }
}

const Profile=async(req,res)=>{
    try{
        const {user_id}=req.params;
        const profile_query=await pool.query('select u.user_id, u.full_name, ua.email, ua.phone from users u join user_auth ua on u.user_id=ua.user_id where u.user_id=$1',[user_id])
        console.log(profile_query.rows[0]);
        res.json(profile_query.rows[0])
    }catch(err){
        console.error(err);
        res.status(500).send('Error while getting profile');
    }
}

const update_profile=async (req,res)=>{
    const client=await pool.connect()
    try{
        const {user_id,full_name,email,phone}=req.body;

        const emailCheck = await client.query(
            'SELECT user_id FROM user_auth WHERE email = $1 AND user_id != $2',
            [email, user_id]
        );
        if (emailCheck.rows.length > 0) {
            return res.status(400).send('Email already exists');
        }
        const phoneCheck = await client.query(
            'SELECT user_id FROM user_auth WHERE phone = $1 AND user_id != $2',
            [phone, user_id]
        );
        if (phoneCheck.rows.length > 0) {
            return res.status(400).send('Phone number already exists');
        }

        await client.query('BEGIN')
        const update_profile_query=await client.query('update users set full_name=$1 where user_id=$2',[full_name,user_id])
        const update_auth_query=await client.query('update user_auth set email=$1 where user_id=$2',[email,user_id])
        const update_phone_query=await client.query('update user_auth set phone=$1 where user_id=$2',[phone,user_id])
        await client.query('COMMIT')

        console.log('profile updated');
        res.send('profile updated')
    }catch(err){
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).send('Error while updating profile')
    }finally{
        client.release()
    }
}


module.exports = {signup,login,set_role_owner,set_user_role_core,add_phone_number,Profile,update_profile};
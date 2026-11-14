const pool = require('../models/cozydar');

const cities=async (req,res)=>{
    const cities=await pool.query('select DISTINCT city from locations')
    res.json(cities.rows)
}

const districts=async (req,res)=>{
    const {city}=req.params
    const districts=await pool.query('select district from locations where city=$1',[city])
    console.log(districts.rows)
    res.json(districts.rows)
}


module.exports = {cities, districts}
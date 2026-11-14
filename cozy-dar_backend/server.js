const express = require('express') 
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/AdminRoutes')
const referenceRoutes = require('./routes/referenceRoutes');
const reservationsRoutes = require('./routes/reservationsRoutes');
const cors = require('cors');
require('dotenv').config();

const app=express()
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/reservations', reservationsRoutes);
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/reference', referenceRoutes);

/*app.get('/getproperty', (req, res) => { 
    const fetch_query="Select * from property"
    pool.query(fetch_query, (err, result)=>{ 
    if(err) 
    { 
    res.json(err) 
    }else{ 
    res.json(result.rows) 
    }})})*/

app.listen(5000,()=>{
    console.log("server is running")
})
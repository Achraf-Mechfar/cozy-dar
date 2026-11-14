const { Pool } = require('pg') 
const pool = new Pool({ 
host: 'localhost', 
port: 5432, 
user: 'postgres', 
password: 'salim123', 
database: 'cozydar' 
}) 
module.exports=pool
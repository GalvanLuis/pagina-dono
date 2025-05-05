const mysql = require('mysql2');
const { promisify } = require('util');

const { database }  = require('../keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('no hubo conexion con la base de datos');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('conexion rechazada');
        }
    }
    if (connection) connection.release();
    console.log('base de datos ha sido conectada exitosamente');
    return;
});

pool.query =  promisify(pool.query);

module.exports = pool;
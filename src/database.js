const mysql = require('mysql');
const { promisify }= require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('LA conexion con la base de datos a caido.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('LA conexion con la base de datos ha sido rechazada');
    }
  }

  if (connection) connection.release();
  console.log('Base de datos conectada');

  return;
});
pool.query = promisify(pool.query);

module.exports = pool;
require('./config/config');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const  { database } = require('./keys');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
  secret: 'mysecretApp',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(cors());
app.use(require('./router/index'))
app.listen(process.env.PORT , () => {
  console.log('Servidor en el puerto',process.env.PORT );
});
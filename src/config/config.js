// // PUERTO
process.env.PORT = process.env.PORT || 4000;
//Vencimiento de token 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//Set del token
process.env.SEMILLADETOKEN = process.env.SEMILLADETOKEN || 'este-es-el-seed-desarrollo';
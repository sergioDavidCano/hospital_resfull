const {Router} = require('express')
const { vereficacionToken, vereficacionADMIN_ROLE } = require('../middlewares/authenticacion');
const router = Router();
const pool = require('../database');
const citas = require('../controllers/citas');
const usuario = require ('../controllers/usuario');
const login = require('../controllers/login');
const usuarioCita = require('../controllers/usuarioCita');
//Crear, actualizar, consultar, cambiar estado, eliminar, ver novedades usuario,
router.post('/usuario',usuario.addCrear);
router.put("/usuario/:id",vereficacionToken,vereficacionADMIN_ROLE, usuario.update);
router.get('/usuario',vereficacionToken,vereficacionADMIN_ROLE, usuario.listar);
router.get("/usuario/:id",vereficacionToken,vereficacionADMIN_ROLE, usuario.listarId);
router.delete('/delete/:id',vereficacionToken,vereficacionADMIN_ROLE, usuario.delete);
router.put('/estado/:id',vereficacionToken,vereficacionADMIN_ROLE, usuario.estado);
router.get('/consultar/paciente',vereficacionToken,vereficacionADMIN_ROLE, usuario.novedadVer)
//login con jwt
router.post('/login',login.login);
//Crear, actualizar, consultar, cambiar estado, eliminar cita
router.post("/citas/:id",vereficacionToken,vereficacionADMIN_ROLE, citas.citas);
router.get("/citas",vereficacionToken, vereficacionADMIN_ROLE, citas.listar);
router.get("/citas/:id",vereficacionToken, vereficacionADMIN_ROLE, citas.listarId);
router.put("/citas/:id",vereficacionToken,vereficacionADMIN_ROLE, citas.update);
router.put("/citas/estado/:id",vereficacionToken, vereficacionADMIN_ROLE, citas.estado);
router.delete("/citas/:id",vereficacionToken,vereficacionADMIN_ROLE, citas.delete);
//Ver citas con usuario paciente y enviar novedades
router.post("/consultar",vereficacionToken, usuarioCita.novedad);
router.get("/consultar",vereficacionToken, usuarioCita.listarUser);
router.get("/consultar/novedad",vereficacionToken, usuarioCita.listarNovedad);
module.exports = router;

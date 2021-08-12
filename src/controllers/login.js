const pool = require("../database");
require('../config/config');
const ctrl = {};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Iniciar seccion con jwt
ctrl.login = async (req, res) => {
    const { email } = req.body;
    await pool.query('SELECT * FROM users WHERE email = ?', [email], (error, usuario) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        };
        if (usuario.length == 0) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'Usuario o contraseña incorrectos'
                }
            });
        };
        if (!bcrypt.compareSync(req.body.password, usuario[0].password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'Usuario o contraseña incorrectos'
                }
            });
        };
        let token = jwt.sign({
            usuario
        }, process.env.SEMILLADETOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30 });
        res.json({
            ok: true,
            usuario,
            token
        });
    });
}
module.exports = ctrl;
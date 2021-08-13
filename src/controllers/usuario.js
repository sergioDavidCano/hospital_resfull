const pool = require("../database");
const ctrl = {};
const bcrypt = require('bcryptjs');
const _ = require('underscore');
//Crea un nuevo usuario
ctrl.addCrear = async (req, res) => {
    const { email, password, username, role } = req.body;
    const newUsuario = {
        email,
        username,
        password: bcrypt.hashSync(password, 10),
        role
    }
    if (!email) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El email es necesario'
        });
    }
    if (!username) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }
    if (!password) {
        return res.status(400).json({
            ok: false,
            mensaje: 'La contraseña es necesario'
        });
    };
    if (password.length <= 5) {
        return res.status(400).json({
            ok: false,
            mensaje: 'La contraseña es muy corta'
        });
    }
    if (role == ! 'ADMIN_ROLE' || role == ! 'USER_ROLE') {
        return res.status(400).json({
            ok: false,
            mensaje: 'El role es incorrecto'
        });
    }
    pool.query('INSERT INTO users set ?', [newUsuario], (error, usuario) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El email debe ser unico'
            });
        }
        if (usuario) {
            res.json({
                ok: true,
                usuario
            });
        }
    });
}
//Actualizar usuario
ctrl.update = async (req, res) => {
    const { id } = req.params;
    let updateUsuario = _.pick(req.body, ['username', 'email', 'role']);
    await pool.query('UPDATE users set ? WHERE id = ?', [updateUsuario, id], (error, usuario) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (usuario.affectedRows >= 1) {
            res.json({
                ok: true,
                mensaje: 'Usuario modificado',
                usuario
            });
        }
        if (usuario.affectedRows == 0) {
            res.json({
                ok: true,
                mensaje: 'Usuario no encontrado',
                usuario
            });
        }
    });
};
//Buscar usuarios o filtrarlos
ctrl.listar = async (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 50;
    limite = Number(limite);
    await pool.query(`SELECT * FROM users WHERE estado ='ACTIVO' AND id > ? AND id < ?`, [desde, limite], (error, usuarios) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }
        res.json({
            ok: true,
            usuarios
        });
    });
};
//Buscar por id
ctrl.listarId = async (req, res) => {
    const { id } = req.params;
    await pool.query(`SELECT * FROM users WHERE estado ='ACTIVO' AND id = ?`, [id], (error, usuarios) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }
        res.json({
            ok: true,
            usuarios
        });
    });
};
//Eliminar un usuario, No es recomendable 
ctrl.delete = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = ?', [id], (error, usuario) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }
        if (usuario.affectedRows == 0) {
            res.json({
                ok: false,
                mensaje: 'Usuario no encontrado'
            });
        }

        if (usuario.affectedRows >= 1) {
            res.json({
                ok: true,
                mensaje: 'Usuario eliminado',
                usuario
            });
        }
    });
};
// No es para eliminar un usuario, es para cambiar su estado
ctrl.estado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body
    const newEstado = {
        estado
    };
    await pool.query('UPDATE users set ? WHERE id = ?', [newEstado, id], (error, usuario) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (usuario.affectedRows >= 0) {
            res.json({
                ok: true,
                mensaje: 'Se ha cambiado el estado del usuario',
                usuario
            });
        }
    });
};
// Ver Novedades de los pacientes
ctrl.novedadVer = async (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 50;
    limite = Number(limite);
    await pool.query(`SELECT * FROM novedad`, [id], (error, citas) => {
        if (error) {
            res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            citas
        });
    });
};
module.exports = ctrl;
module.exports = ctrl;
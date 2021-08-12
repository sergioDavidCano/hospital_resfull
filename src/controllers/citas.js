const pool = require("../database");
const _ = require('underscore');
const ctrl = {};
//Crear nueva cita al paciente
ctrl.citas = async (req, res) => {
    const { id } = req.params;
    const { asunto, especialidad, description, fecha, hora } = req.body;
    const newCita = {
        asunto,
        especialidad,
        description,
        user_id: id,
        fecha,
        hora,
        administrador: `La cita fue asignada por ${req.usuario[0].username}, puedes contactarlo al ${req.usuario[0].email}`
    }
    await pool.query('INSERT INTO citas set ?', [newCita], (error, cita) => {
        if (
            asunto === undefined || especialidad === undefined ||
            description === undefined || fecha === undefined ||
            hora === undefined) {
            return res.json({
                ok: false,
                error: {
                    mensaje: 'Tienes que completar el campo'
                }
            });
        }
        if (error) {
            return res.json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            cita
        })
    });
};
//Buscar citas
ctrl.listar = async (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 50;
    limite = Number(limite);
    await pool.query(`SELECT * FROM citas WHERE estado ='ACTIVO' AND id > ? AND id < ?`, [desde, limite], (error, usuarios) => {
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
//Obtener una cita por id 
ctrl.listarId = async (req, res) => {
    const { id } = req.params;
    await pool.query(`SELECT * FROM citas WHERE estado ='ACTIVO' AND id = ?`, [id], (error, usuarios) => {
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
//Actualiza una cita
ctrl.update = async (req, res) => {
    const { id } = req.params;
    let newCita = _.pick(req.body, ['asunto', 'especialidad', 'description', 'fecha', 'hora']);
    await pool.query('UPDATE citas set ? WHERE id = ?', [newCita, id], (error, usuario) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (usuario.affectedRows >= 1) {
            return res.json({
                ok: true,
                mensaje: 'Cita actualizada',
                usuario
            });
        }
        if (usuario.affectedRows == 0) {
            res.json({
                ok: true,
                mensaje: 'Cita no encontrada',
                usuario
            });
        }
    });
};
//Cambiar estado de la cita
ctrl.estado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body
    const newEstado = {
        estado
    };
    await pool.query("UPDATE citas set ? WHERE id = ?", [newEstado, id], (error, usuario) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (usuario.affectedRows >= 0) {
            res.json({
                ok: true,
                mensaje: 'Se ha cambiado el estado de la cita',
                usuario
            });
        }
    });
};
//Eliminar una cita
ctrl.delete = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM citas WHERE ID = ?', [id], (error, citaBorrada) => {
        if (error) {
            res.status(400).json({
                ok: false,
                error
            });
        }
        if (citaBorrada.affectedRows == 0) {
            return res.json({
                ok: false,
                mensaje: 'Cita no encontrada'
            });
        }

        if (citaBorrada.affectedRows >= 1) {
            res.json({
                ok: true,
                mensaje: 'Cita eliminada',
                citaBorrada
            });
        }
    });
};
module.exports = ctrl;
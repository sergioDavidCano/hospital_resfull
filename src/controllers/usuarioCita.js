const pool = require("../database");
const ctrl = {};
//Asignar una novedad
ctrl.novedad= async (req, res) => {
    const id = req.usuario[0].id;
    const name = req.usuario[0].username;
    const gmail = req.usuario[0].email;
    const { asunto_novedad, novedad } = req.body
    const newNovedad = {
        asunto_novedad,
        novedad,
        user_id: id,
        nombre: name,
        email: gmail
    };
    await pool.query('INSERT INTO novedad set ?', [newNovedad], (error, novedad) => {
        if (error) {
            res.status(400).json({
                ok: false,
                error
            });
        }
        if (novedad.affectedRows >= 0) {
            res.json({
                ok: true,
                mensaje: 'Novedad agregada',
                novedad
            });
        }
    });
};
// Ve todas mis novedades
ctrl.listarNovedad = async (req, res) => {
    const id = req.usuario[0].id;
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 50;
    limite = Number(limite);
    await pool.query(`SELECT * FROM novedad WHERE user_id = ?`, [id], (error, citas) => {
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
//Ver mis citas asignadas por admin
ctrl.listarUser = async (req, res) => {
    const id = req.usuario[0].id;
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 50;
    limite = Number(limite);
    await pool.query(`SELECT * FROM citas WHERE estado ='ACTIVO' AND user_id = ?`, [id], (error, citas) => {
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
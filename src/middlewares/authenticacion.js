//Verificar token 
const jwt = require('jsonwebtoken');
let vereficacionToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEMILLADETOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    mensaje:'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario
        next();
    });
};
let vereficacionADMIN_ROLE = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario[0].role === 'ADMIN_ROLE') {
        next();
    } else
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
}
module.exports ={
    vereficacionToken,
    vereficacionADMIN_ROLE
}
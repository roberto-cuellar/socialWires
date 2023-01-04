const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res = response, next ) =>  {

    // Se recupera token en el header x-token
    const token = req.header('x-token');

    // En caso de que no se tenga el token, se regresara un error de autenticacion
    if( !token  ) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        });
    }

    try {
        
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.uid  = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })        
    }

    next();
}

module.exports = {
    validarJWT
}
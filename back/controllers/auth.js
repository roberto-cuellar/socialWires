const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


// Metodo encargado de realizar la creacion del usuario
const crearUsuario = async(req, res = response) => {

    // Se extraen los datos del cuerpo de la peticion
    const { email, name, password, nickname } = req.body;

    try {
        // Se realiza la verificacion del email
        const usuario = await Usuario.findOne({ email }); 

        // En caso de existir
        if(usuario){
            return res.status(400).json({ // Bad request
                ok: false,
                msg: 'Ya hay un usuario registrado en el sistema con este email'
            })
        }

        // En caso de no existir en la base de datos actual
        const dbUser = new Usuario(req.body);

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Se genera el JWT
        const token = await generarJWT(dbUser.id, name);

        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Servicio temporalmente no disponible, pongase en contacto con el administrador'
        })
        
    }

}

const loginUsuario = async (req, res) => {

    const { email, password } = req.body; 

    try {
        // Se valida si existe un usuario con el email 
        const dbUser = await Usuario.findOne({ email });

        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Se valida si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }

        // Se genera el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });


        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, por favor hable con el administrador.'
        })
        

    }
}


// Revalidar token 
const revalidarToken = async(req, res=response) => {
    
    const {uid, name} = req;

    // Generar el JWT
    const token = await generarJWT( uid, name );

    return res.json({
        ok: true,
        uid, 
        name,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


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

        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Servicio temporalmente no disponible, pongase en contacto con el administrador'
        })
        
    }

}


module.exports = {
    crearUsuario
}
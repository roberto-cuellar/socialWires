const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const { merge } = require('../routes/auth');


// Metodo encargado de realizar la creacion del registro de un message
const guardarMessage = async(req, res = response) => { 
    // Se extraen los datos del cuerpo de la peticion
    const { title, body, name, uid } = req.body;

    try {

        // Se busca en la bd el usuario 
        const dbUser = await Usuario.findOne({_id : uid});

        // Se obtiene la fecha y la hora
        const dateAux = new Date();
        time = dateAux.getHours()+':'+dateAux.getMinutes();
        date = (Number(dateAux.getDay())+1)+'/'+(Number(dateAux.getMonth())+1)+'/'+dateAux.getFullYear();

        dbUser.messages.push({
            title,
            body,
            name,
            time,
            date
        })

        dbUser.save();

         // Respuesta del servicio
         return res.json({
            ok: true,
            name: dbUser.name,
            msg: 'Msg guardado correctamente'
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo completar la accion, por favor intente mas tarde.'
        })  
    }

};


// Metodo encargado de realizar la consulta de mensajes para un solo usuario
const obtainUserMessage = async(req=request, res = response) => { 
    
    // Se extraen los valores del query que se utilizaran 
    const  {date,uid}   = req.query;

    try {

        // Se busca en la bd el usuario 
        const dbUser = await Usuario.findOne({_id : uid});

        let consulta = [];
        if(date){
            consulta = dbUser.messages?.filter(register => register.date == date);
        }else{
            consulta = dbUser.messages;

        }

        // Respuesta del servicio
        return res.json({
            ok: true,
            name: dbUser.name,
            data: consulta
        });       
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo realizar la consulta, por favor intentelo más tarde.'
        })  
    }        
     
}


// Metodo encargado de realizar la consulta de mensajes para todos los usuarios
const obtainAllMessages = async(req=request, res = response) => { 
    
    // Se extraen los valores del query que se utilizaran 
    const  {date,text}   = req.query;

    try {

        // Se busca en la bd el usuario 
        const dbUsers = await Usuario.find({});
        let msgs = [];
        if(dbUsers.length > 0) {
            dbUsers.forEach(usuario => {
                // Se agregan todos los usuarios al array de mensajes
                msgs = [...msgs, ...usuario.messages];
            })

            // Se realiza el filtro de fecha
            if(date){
                msgs = msgs.filter(register => register.date == date);
            }

            if(text){
                msgs = msgs.filter(register => register.title.includes(text));
            }

            // Respuesta del servicio
            return res.json({
                ok: true,
                data: msgs
            });       
            
        }else{
            // Respuesta del servicio
            return res.json({
                ok: false,
                msg: 'No se encontraron mensajes registrados'
            });       
        
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo realizar la consulta, por favor intentelo más tarde.'
        })  
    }        
     
}

module.exports = {
    guardarMessage,
    obtainUserMessage,
    obtainAllMessages
}
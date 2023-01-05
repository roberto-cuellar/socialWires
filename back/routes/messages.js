const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { guardarMessage, obtainUserMessage, obtainAllMessages } = require('../controllers/messages');

const router = Router();

// Crear un nuevo usuario
router.post( '/add', [
    check('title', 'El titulo obligatorio').not().isEmpty(),
    check('body', 'El cuerpo del mensaje es obligatorio').not().isEmpty(),
    check('uid', 'El uid es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
], guardarMessage );


// Recuperar mensajes para un usuario
router.get( '/user-messages', validarJWT, obtainUserMessage );

// Recuperar mensajes para todos los usuarios
router.get( '/all-user-messages', validarJWT, obtainAllMessages );


module.exports = router;
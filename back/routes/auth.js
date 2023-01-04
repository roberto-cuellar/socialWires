const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario } = require('../controllers/auth');

const router = Router();

// Crear un nuevo usuario
router.post( '/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('nickname', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
], crearUsuario );



module.exports = router;
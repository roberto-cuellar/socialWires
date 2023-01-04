const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario } = require('../controllers/auth');

const router = Router();

// Crear un nuevo usuario
router.post( '/new', [], crearUsuario );

// Login de usuario
router.post( '/login', [], loginUsuario );


module.exports = router;
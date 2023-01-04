const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nickname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    messages: [{title: String, body: String, time: String, date: String}]
});

module.exports = model('Usuario', UsuarioSchema );
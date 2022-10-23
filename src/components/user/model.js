const mongoose = require('mongoose');
const USER_SCHEMA = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: String
    },
    email: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    hasWhatsApp: Boolean,
    age: Number,
    rol: String,
    experience: {
        type: String,
        required: true
    }
});


USER_SCHEMA.set('timestamps', true);

const model = mongoose.model('User', USER_SCHEMA);

module.exports = model;

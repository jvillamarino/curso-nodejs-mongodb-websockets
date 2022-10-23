const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

Schema.set('timestamps', true);

const model = mongoose.model('Jobs', Schema);

module.exports = model;
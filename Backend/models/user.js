const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    fullName: {
        type: 'string',
        require: true,
        min: 6,
        max: 100
    },
    email: {
        type: 'string',
        require: true,
        min: 6,
        max: 100,
        unique: true
    },
    password: {
        type: 'string',
        require: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('users', UserSchema);
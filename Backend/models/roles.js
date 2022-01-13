const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolSchema = Schema({
        
    idUsuario: String,
    nombreUsuario: String,
    rol: Boolean,
    estado: Boolean

})

module.exports = mongoose.model('roles', RolSchema);
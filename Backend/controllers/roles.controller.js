const RolSchema = require('../models/roles');
const { validationResult } = require('express-validator');

const getRole = async (req, res) => {
    if (req.params.id != 'undefined') {
        try {
            let role = await RolSchema.findById(req.params.id);
            res.status(200).json({ data: role });
        }
        catch (err) {
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Rol no encontrado"
                }
            })
        }
    } else {
        res.status(404).json({
            error: {
                code: 404,
                message: "ID not found"
            }
        })
    }
}

const getRoles = async (req, res) => {
    try {
        let roles = await RolSchema.find();
        res.status(200).json({ data: roles });
    }
    catch (err) {
        res.status(404).json({
            error: {
                code: 404,
                message: "Problemas con la base de datos" + err.message
            }
        })
    }
}

const createRole = async (req, res) => {
    //verificando que si hay errores en los parametros de la solictud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //si existen errores damos una respuesta erronea
        return res.status(400).json({
            error: {
                code: 404,
                errors: errors.array()
            }
        });
    }
    let role = new RolSchema(req.body);
    try {
        await role.save();
        res.status(201).json({ data: role });
    }
    catch (err) {
        res.status(404).json({
            error: {
                code: 404,
                message: "Problemas con la base de datos" + err.message
            }
        })
    }
}

const updateRole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: {
                code: 404,
                errors: errors.array()
            }
        });
    }
    try {
        let newRole = {
            id: req.params.id,  
            idUsuario:req.body.idUsuario,                    
            nombreUsuario:req.body.nombreUsuario,
            rol:req.body.rol, 
            estado: req.body.estado          
        }
        await RolSchema.findByIdAndUpdate(req.params.id, newRole);
        res.status(201).json({ data: newRole })
    }
    catch (err) {
        res.status(404).json({
            error: {
                code: 404,
                message: "ID not found"
            }
        })
    }
}


const deleteRole = async (req, res) => {
    if (req.params.id != 'undefined') {
        try {
            let result = await RolSchema.findByIdAndRemove(req.params.id);
            res.status(200).json({ data: result });
        }
        catch (err) {
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Rol no encontrado"
                }
            })
        }
    } else {
        res.status(404).json({
            error: {
                code: 404,
                message: "ID not found"
            }
        })
    }
}

module.exports.getRole = getRole;
module.exports.getRoles = getRoles;
module.exports.createRole = createRole;
module.exports.updateRole = updateRole;
module.exports.deleteRole = deleteRole;
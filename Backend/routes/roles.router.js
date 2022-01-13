const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { rolesController } = require('../controllers');
const verifyToken = require('../middlewares/verifyToken');

router.get('/:id', rolesController.getRole);

router.get('/', rolesController.getRoles);

router.post('/',
    body('idUsuario', 'El numero de identificacion del usuario es requerido y debe ser numerico').exists(),
    body('nombreUsuario', 'El nombre de usuario es requerido').exists(),
    body('rol', 'el rol del usuario es requerido').isBoolean().exists(),
    body('estado', 'El estado del usuario es requerido(true/false)').isBoolean().exists()
    , rolesController.createRole);

router.put('/:id',
    body('IdUsuario', 'El numero de identificacion del usuario es requerido y debe ser numerico').exists().isNumeric(),
    body('nombreUsuario', 'El nombre de usuario es requerido').exists(),
    body('rol', 'el rol del usuario es requerido').isBoolean().exists(),
    body('estado', 'El estado del usuario es requerido(true/false)').isBoolean().exists()
    , rolesController.updateRole);

router.delete('/:id', rolesController.deleteRole);

module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
// const { validarCampos } = require('../middleweares/validar-campos');
// const { validarJWT } = require('../middleweares/validar-jwt');
// const { adminRole, tieneRol } = require('../middleweares/validar-roles');

const { validarCampos, validarJWT, tieneRol, adminRole } = require ('../middleweares');


const router = Router();

//Get
router.get('/', usuariosGet)

//Post
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

//Put
router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

//Delete
router.delete('/:id',[
    validarJWT,
    //adminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

//patch
router.patch('/', usuariosPatch)


module.exports = router;
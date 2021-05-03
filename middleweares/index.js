

const  validarCampos  = require('../middleweares/validar-campos');
const  validarJWT  = require('../middleweares/validar-jwt');
const  validarRoles  = require('../middleweares/validar-roles');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}
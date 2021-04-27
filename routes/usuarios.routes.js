const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');

const router = Router();

//Get
router.get('/', usuariosGet)

//Post
router.post('/', usuariosPost)

//Put
router.put('/:id', usuariosPut)

//Delete
router.delete('/', usuariosDelete)

//patch
router.patch('/', usuariosPatch)


module.exports = router;
const { response, request } = require('express');

//Get
const usuariosGet = (req = request, res = response) => {
    const {q, nombre='sin nombre', apikey, page = 1, limit} = req.query;
    res.json({
        msg: 'get API - Controladore',
        q, nombre, apikey, page, limit
    })
}

//Post
const usuariosPost =  (req, res) => {
    const {nombre, edad} = req.body;
    res.json({
        
        msg: 'Post API - Controller',
        nombre, edad
    })
}

//Put
const usuariosPut = (req, res) => {
    const {id} = req.params;

    res.json({
        
        msg: 'Put API - Controller',
        id
    })
}

//Delete 
const usuariosDelete = (req, res) => {
    res.json({
        
        msg: 'Delete API - Controller'
    })
}

//patch
const usuariosPatch = (req, res) => {
    res.json({
        
        msg: 'patch API - Controller'
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}
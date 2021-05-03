const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
// const { validationResult } = require('express-validator');

//Get
const usuariosGet = async (req = request, res = response) => {
    // const { q, nombre = 'sin nombre', apikey, page = 1, limit } = req.query;
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limit));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
        
    });
}

//Post
const usuariosPost = async (req, res) => {
    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});

    // if(existeEmail){
    //     return res.status(400).json({
    //         msg: 'Ese correo ya este en uso'
    //     });
    // }

    //Encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar db

    await usuario.save();

    res.json({

        msg: 'Post API - Controller',
        usuario
    })
}

//Put
const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if (password) {

        //Encriptar pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

//Delete 
const usuariosDelete =  async(req, res) => {
    const {id} = req.params;
    // const uid = req.uid;

    //Borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    // res.json(usuario);


    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    // const usuarioAutenticado = req.usuario;

    res.json(usuario);
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
const express = require('express');
const cors = require('cors');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //Lectura y parse del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
       this.app.use(this.usuariosPath   , require('../routes/usuarios.routes'));
    } 

    listen() {
        this.app.listen(this.port, () => {
            console.log('\nServidor Corriendo en puerto:', this.port);
        })
    }


}

module.exports = Server;
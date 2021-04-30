const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('\nBase de datos en linea...');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniicializar la base de datos');
    }

}


module.exports = {
    dbConnection
}
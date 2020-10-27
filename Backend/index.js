/******* CONEXION A LA BASE DE DATOS ***** */

'use strict'


var mongoose = require('mongoose');

var app=require('./app');

//variables de entorno locales
require('dotenv').config({path: 'variables.env'});

console.log(process.env.MONGO_URI);


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

 
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/baseerasmus",{ useUnifiedTopology: true, useNewUrlParser: true})
        .then(()=>{
            console.log('La conexion a la BD se ha realizado con exito');

           
        });

    

//LEER LOCAL HOST DE VARIABLE Y PUERTOS

const host= process.env.HOST || '0.0.0.0';
const port= process.env.PORT || 3900 ;


app.listen(port, host, ()=> {
    console.log('servidor corriendo en http://localhost:'+port + " " + host);

});

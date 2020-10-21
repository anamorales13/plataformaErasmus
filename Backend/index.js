/******* CONEXION A LA BASE DE DATOS ***** */

'use strict'


var mongoose = require('mongoose');

var app=require('./app');

//variables de entorno locales
require('dotenv').config({path: 'variables.env'});

console.log(process.env.DB_URL);

//const PORT = process.env.PORT || 3900;
//var port= 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

//const MONGODB_URI="mongodb+srv://anamorales13:hNcazIGjCMBPeZPl@plataforma.2cxua.mongodb.net/test?retryWrites=true&w=majority"


/*app.set('port', process.env.PORT);
console.log(PORT);*/

 
mongoose.connect(process.env.DB_URL,{ useUnifiedTopology: true, useNewUrlParser: true})
        .then(()=>{
            console.log('La conexion a la BD se ha realizado con exito');

           /* app.listen(app.get('port'), ()=> {
                console.log('servidor corriendo en http://localhost:'+PORT);
    
            });*/
        });

//LEER LOCAL HOST DE VARIABLE Y PUERTOS

const host= process.env.HOST || '0.0.0.0';
const port= process.env.PORT || 3900;


app.listen(port, host, ()=> {
    console.log('servidor corriendo en http://localhost:'+port);

});
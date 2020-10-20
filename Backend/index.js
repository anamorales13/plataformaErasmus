/******* CONEXION A LA BASE DE DATOS ***** */

'use strict'

var mongoose = require('mongoose');

var app=require('./app');

const PORT = process.env.PORT || 3900;
//var port= 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;


const MONGODB_URI='mongodb+srv://anamorales13:hNcazIGjCMBPeZPl@plataforma.2cxua.mongodb.net/test'

mongoose.connect(MONGODB_URI,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:false, useCreateIndex: true})
        .then(()=>{
            console.log('La conexion a la BD se ha realizado con exito');

            app.listen(PORT, ()=> {
               console.log('servidor corriendo en http://localhost:'+ PORT);
    
            });
        })
        .catch((err) => console.log(err));
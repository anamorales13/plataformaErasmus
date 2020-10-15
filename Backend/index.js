/******* CONEXION A LA BASE DE DATOS ***** */

'use strict'

var mongoose = require('mongoose');

var app=require('./app');
app.set('port', process.env.PORT || 3900);
//var port= 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/baseerasmus',{ useUnifiedTopology: true, useNewUrlParser: true})
        .then(()=>{
            console.log('La conexion a la BD se ha realizado con exito');

            app.listen(app.get('port'), ()=> {
                console.log('servidor corriendo en http://localhost:'+port);
    
            });
        });
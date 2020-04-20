'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



var AlumnosSchema=Schema ({   

    nombre: String,
    apellidos: String, 
    usuario: String, 
    password: String,
    email: String,
    telefono: String,
    UniDestino: String,
    image: String
      
});



module.exports= mongoose.model('Alumno', AlumnosSchema);





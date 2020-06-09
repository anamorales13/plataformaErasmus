'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



var ProfesorSchema=Schema ({   

    nombre: String,
    apellidos: String, 
    usuario: String, 
    password: String,
    email: String,
    telefono: String,
    despacho: String,
    image: String,
    alumnos:{type: Schema.ObjectId, ref:'Alumno'}
      
});



module.exports= mongoose.model('Profesor', ProfesorSchema);
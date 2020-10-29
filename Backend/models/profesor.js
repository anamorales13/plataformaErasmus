'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



var ProfesorSchema=Schema ({   

    nombre: String,
    apellido1: String, 
    apellido2: String,
    usuario: String, 
    password: String,
    email: String,
    telefono: String,
    edificio: String,
    despacho: String,
    image: String,
    tipo:String,
    datos:String,
    alumnos:[{type: Schema.ObjectId, ref:'Alumno'}]
      
});



<<<<<<< HEAD
module.exports= mongoose.model('Profesor', ProfesorSchema);
=======
module.exports= mongoose.model('Profesor', ProfesorSchema);
>>>>>>> master

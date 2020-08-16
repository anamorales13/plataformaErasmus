'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



const documentosOficialSchema = new Schema({
    nombre: String,
    fecha: {type:Date, default: Date.now},
    url: String,
   /* estado: {
        type: String,
        enum: ["NO PRESENTADO", "ACEPTADO" ,"ENTRAMITE","NO ACEPTADO"]
    }*/
    estado:String,
    tipo: String
});

var AlumnosSchema=Schema ({   

    nombre: String,
    apellido1: String, 
    apellido2: String,
    usuario: String, 
    password: String,
    email: String,
    telefono: String,
    destino: {type:Schema.ObjectId, ref:'Destino'},
    image: String,
    tipo:String,
    documentos: [documentosOficialSchema],
    profesor: {type: Schema.ObjectId, ref: 'Profesor'},
    coordinador: {type: Schema.ObjectId, ref: 'Profesor'}

});



module.exports= mongoose.model('Alumno', AlumnosSchema);





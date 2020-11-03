
'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



const DocumentosSchema = Schema({
    title:String,
    url: String,
    tipoDocumento:String,
    descripcion: String, 
    date: {type:Date, default: Date.now},
    link:String,
    alumno: {type: Schema.ObjectId, ref: 'Alumno'},
    profesor: {type: Schema.ObjectId, ref: 'Profesor'},
    tipo_nube:String,
 });


 module.exports= mongoose.model('Documentos', DocumentosSchema);

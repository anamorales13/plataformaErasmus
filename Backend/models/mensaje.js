
'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var MensajeSchema= Schema({
    texto: String,
    visto: String,
    asunto: String,
    emisor: {type: Schema.ObjectId, ref: 'Alumno'},
    receptor: {type: Schema.ObjectId, ref: 'Alumno'}
}) ;

module.exports= mongoose.model('Mensaje', MensajeSchema);

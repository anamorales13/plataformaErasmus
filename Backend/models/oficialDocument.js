'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



const oficialDocument = Schema({
    
    title:String,
    url: String,
    tipoDocumento:String,
    date: {type:Date, default: Date.now},
    alumno: String,
    state: String,
 });


 module.exports= mongoose.model('oficialDocument', oficialDocument);
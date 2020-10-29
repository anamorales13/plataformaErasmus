'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;




var destinosSchema=Schema ({   
    pais: String,
    ciudad: String,
    carrera: String,
    profesor: {type: Schema.ObjectId, ref:'Profesor'},
    coordinador: {type: Schema.ObjectId, ref:'Profesor'},
    
    
      
});



<<<<<<< HEAD
module.exports= mongoose.model('Destino', destinosSchema);
=======
module.exports= mongoose.model('Destino', destinosSchema);
>>>>>>> master

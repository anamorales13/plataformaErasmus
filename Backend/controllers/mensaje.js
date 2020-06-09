'use strict'


var moment= require('moment');
//var mongoosePaginate= require('mongoose-pagination');

var User= require('../models/alumno');
var mensaje= require('../models/mensaje');

var controllers = {

    probando: ( req, res) =>{
    res.status(200).send({message: 'Hola que tal'});
}

};

module.exports = controllers;
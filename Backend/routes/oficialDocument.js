'use strict'

var express= require('express');
var DocumentoController= require('../controllers/oficialDocument');


var routerDocOficial = express.Router(); //disponible el router

var multipart = require('connect-multiparty'); 
var md_upload = multipart({ uploadDir: './upload/oficialDocument'});


//RUTAS VALIDAS


module.exports= routerDocOficial;
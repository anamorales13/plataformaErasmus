'use strict'

var express= require('express');
var DocumentoController= require('../controllers/destinos');


var router = express.Router(); //disponible el router

var multipart = require('connect-multiparty'); 
var md_upload = multipart({ uploadDir: './upload/documents'});


router.post('/save', DocumentoController.save);

module.exports= router;
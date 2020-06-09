

'use strict'

var express= require('express');
var mensajeController= require('../controllers/mensaje');


var router = express.Router(); //disponible el router
var md_auth= require('../Middleware/authenticated');

//var multipart = require('connect-multiparty'); 
//var md_upload = multipart({ uploadDir: './upload/documents'});



router.get('/probando', md_auth.ensureAuth, mensajeController.probando);

module.exports=router;
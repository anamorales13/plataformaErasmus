'use strict'

var express= require('express');
var DestinoController= require('../controllers/destinos');


var router = express.Router(); //disponible el router

var multipart = require('connect-multiparty'); 
var md_upload = multipart({ uploadDir: './upload/documents'});


router.post('/save', DestinoController.save);
router.get('/buscar',DestinoController.buscar );

module.exports= router;
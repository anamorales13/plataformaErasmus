'use strict'

var express= require('express');
var ProfesorController= require('../controllers/profesor');


var router = express.Router(); //disponible el router

var multipart = require('connect-multiparty'); 
var md_upload = multipart({ uploadDir: './upload/documents'});

router.post('/save', ProfesorController.save);
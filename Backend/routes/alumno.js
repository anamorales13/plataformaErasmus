'use strict'

var express= require('express');
var AlumnoController= require('../controllers/alumno');


var router = express.Router(); //disponible el router
var md_auth= require('../Middleware/authenticated');

var multipart= require('connect-multiparty');
var md_uploadd= multipart({uploadDir: './upload/users'});

/*var multiparty = require('connect-multiparty'); 
var md_upload = multiparty({ uploadDir: './upload/alumnos'});*/


//RUTAS VALIDAS
router.get('/pruebas', md_auth.ensureAuth, AlumnoController.pruebas);
router.post('/save', AlumnoController.save);
router.post('/login' , AlumnoController.loginUser);
router.get('/user/:id', /*md_auth.ensureAuth,*/ AlumnoController.getUser);
router.put('/update-user/:id' , /*md_auth.ensureAuth,*/ AlumnoController.updateUser);
router.put('/update-password/:id', AlumnoController.updatePassword);
router.post('/upload-image-user/:id',/* [md_auth.ensureAuth,*/ md_uploadd, AlumnoController.uploadImage );
router.get('/get-image-user/:imageFile', AlumnoController.getImageFile );
router.delete('/delete-image/:id',md_uploadd, AlumnoController.deleteImageFile);
router.post('/compararPassword/:id', AlumnoController.comparePassword);








module.exports= router;
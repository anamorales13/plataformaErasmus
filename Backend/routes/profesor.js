'use strict'

var express = require('express');
var ProfesorController = require('../controllers/profesor');


var router = express.Router(); //disponible el router

var multipart = require('connect-multiparty');
var md_uploadd= multipart({uploadDir: './upload/users'});

router.post('/save', ProfesorController.save);
router.post('/login', ProfesorController.loginUser);
router.get('/profesores', ProfesorController.getProfesores);
router.put('/update-user/:id', ProfesorController.setprofesor);
router.put('/saveAlumnos/:id', ProfesorController.setAlumno);
router.get('/profesor/:id', ProfesorController.getprofesor);
router.get('/alumnos/:id', ProfesorController.getAlumnos);
router.post('/compararPassword/:id', ProfesorController.comparePassword);
router.put('/update-password/:id', ProfesorController.updatePassword);


router.post('/upload-image-user/:id',/* [md_auth.ensureAuth,*/ md_uploadd, ProfesorController.uploadImage);
router.get('/get-image-user/:imageFile', ProfesorController.getImageFile);
router.delete('/delete-image/:id', md_uploadd, ProfesorController.deleteImageFile);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> master

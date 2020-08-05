
var validator = require('validator');
var Profesor = require('../models/profesor');
var fss = require('fs');
var path = require('path');

var express = require("express");

var session = require("express-session");

var app = express();

app.use(session({
    secret: "1352ljdainekg875d",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

var controllers = {


    save: (req, res) => {
        var params = req.body;

        //1.- validar los datos
        try {
    
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_usuario = !validator.isEmpty(params.usuario);
            var validate_password = !validator.isEmpty(params.password);
            var validate_email = !validator.isEmpty(params.email);
            var validate_telefono =!validator.isEmpty(params.telefono);
            var validate_despacho=!validator.isEmpty(params.despacho);
            var validate_apellidos = !validator.isEmpty(params.apellidos);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }


        if (validate_nombre && validate_apellidos && validate_usuario && validate_password && validate_email && validate_telefono && validate_despacho ) {

            // 2- Crear el objeto a guardar
            var profesor = new Profesor();

            // 3- Asignar valores
            profesor.nombre = params.nombre;
            profesor.usuario = params.usuario;
            profesor.password = params.password;
            profesor.email = params.email;
            profesor.apellidos = params.apellidos;
            profesor.telefono=params.telefono;
            profesor.despacho=params.despacho;
            profesor.image = 'user-default.jpg';
        

            // CONTROLAR DUPLICADOS 

            Profesor.find({
                $and: [
                    { email: { $eq: params.email.toLowerCase() } },
                    { usuario: { $eq: params.usuario.toLowerCase() } }]
            })
                .exec((err, users) => {
                    if (err) return res.status(500).send({
                        status: 'err',
                        message: "error en la peticion"
                    })
                    if (users && users.length >= 1) {
                        return res.status(200).send({
                            message: "el usuario que intenta registrar ya existe"
                        })
                    } else {


                        //cifrar contraseña:
                        bcrypt.hash(params.password, null, null, (err, hash) => {
                            profesor.password = hash;

                            // 4 - Guardar el objeto

                            profesor.save((errn, profesorStored) => {

                                if (errn || !profesorStored) {
                                    return res.status(500).send({
                                        status: 'error',
                                        message: 'El alumno no se ha guardado'
                                    });
                                }

                                return res.status(200).send({
                                    status: 'sucess',
                                    profesor: profesorStored
                                });
                            });
                        });
                    }
                })
        } else { //no superan la validación
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos'
            });
        }
    },

    /*--------------------------------*/
    /*****     LOGIN UN  USER      **** */
    /*--------------------------------*/

    loginUser: (req, res) => {

        var params = req.body;

        userString = params.usuario;
        passwString = params.password;


        Profesor.findOne({ usuario: { $eq: userString } })
            .exec((err, users) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: "Error en la petición"
                    });
                }
                if (users) {


                    bcrypt.compare(passwString, users.password, (err, check) => {
                        if (check) {
                            // if(params.gettoken){
                            //generar y devolver el token
                            users.password = undefined;
                            return res.status(200).send({
                                status: 'sucess',
                                users,
                                token: jwt.createToken(users)

                            })
                            // req.session.user=JSON.stringify(users);
                            /*
                            return res.status(200).send({
                                token: jwt.createToken(users)
                            });*/

                            //  }else{

                            //     }

                            /*para no enviar la password */


                        } else {
                            return res.status(404).send({
                                status: 'error',
                                message: 'El usuario no ha introducido los datos correstamente'
                            });
                        }
                    })
                } else {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El usuario no ha introducido los datos correstamente'
                    });
                }
            })
    },

    comparePassword: (req, res) => {

        var userId = req.params.id;
        var params = req.body;


        passwString = params.password;

        console.log("hola");
        Profesor.findById(userId, (err, userget) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error en la petición'
                });
            }
            if (!userget) {
                return res.status(404).send({
                    message: 'El usuario no existe'
                });
            }
            if (userget) {
                console.log("comparamos");
                console.log(passwString);
                console.log(userget.password);
                bcrypt.compare(passwString, userget.password, (err, check) => {
                    if (check) {
                        console.log("sucess");
                        return res.status(200).send({
                            status: 'sucess'
                        })
                    } else {
                        return res.status(200).send({
                            status: 'failed'
                        })
                    }

                });
            }

        });
    },

    getProfesores: (req,res )=>{
        
        console.log(userString);

        Profesor.find()
            .exec((err, profesor) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    });
                }

                if (!profesor || profesor.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: ' no hay documentos que coincidan con tu usuario'
                    });
                }
                console.log('hola');
                return res.status(200).send({

                    status: 'sucess',
                    profesor
                });
            });
    }
}

module.exports = controllers;
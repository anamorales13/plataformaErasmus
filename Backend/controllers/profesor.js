
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
        var profesor = new Profesor();

        profesor.nombre = params.nombre;
        profesor.apellidos = params.apellidos;
        profesor.usuario = params.usuario;
        profesor.password = params.password;
        profesor.email = params.email;
        profesor.telefono = params.telefono;
        profesor.email = params.email;
        profesor.despacho = params.despacho;



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


    }
}

module.exports = controllers;
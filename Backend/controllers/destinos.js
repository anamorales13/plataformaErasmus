
var validator = require('validator');
var Destino = require('../models/destinos');
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
        var destino = new Destino();



        destino.pais = params.pais;
        destino.ciudad = params.ciudad;
        destino.carrera = params.carrera;
        destino.profesor = params.profesor;
        destino.coordinador = params.coordinador;



        destino.save((errn, destinoStored) => {

            if (errn || !destinoStored) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El alumno no se ha guardado'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                destino: destinoStored
            });

        });

    },

    buscar: (req, res) =>{
        var params= req.body;

        Destino.find({ ciudad: { $eq: params.ciudad }, carrera: {$eq: params.carrera} ,})
        .exec((err, destino) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            }

            if (!destino ) {
                return res.status(404).send({
                    status: 'error',
                    message: ' no hay documentos '
                });
            }

            
           
            return res.status(200).send({
                destino
            });
        });
        

    }
}

module.exports = controllers;
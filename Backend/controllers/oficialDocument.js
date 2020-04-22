'use strict'

var validator = require('validator');
var Documento = require('../models/oficialDocument');
var fs = require('fs');
var path = require('path');

var controllers = {

    save: (req, res) => {

        var parametros = req.body;
      
        console.log(params);
        var documento = new Documento();
        documento.title= parametros.title;
        documento.alumno= req.params.alumno;

        documento.save((err, documentoStored) => {
            if (err || !documentoStored) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El documento no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'sucess',
                    documento: documentoStored
                });
            });
       
    },


    getDocumentos: (req, res) => {

        var userString = req.params.user;
        console.log(userString);

        Documento.find({ alumnoNombre: { $eq: userString } })
            .exec((err, documento) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    });
                }

                if (!documento || documento.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: ' no hay documentos que coincidan con tu usuario'
                    });
                }
                console.log('hola');
                return res.status(200).send({

                    status: 'sucess',
                    documento
                });
            });

    },

}


module.exports = controllers;
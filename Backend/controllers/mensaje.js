'use strict'


var moment = require('moment');
var mongoosePaginate= require('mongoose-pagination');

var User = require('../models/alumno');
var Mensaje= require('../models/mensaje');
const { estimatedDocumentCount } = require('../models/alumno');

var controllers = {

    probando: (req, res) => {
        res.status(200).send({ message: 'Hola que tal' });
    },

    save: (req, res) => {
        var params = req.body;


        if (!params.texto || !params.receptor || !params.asunto || !params.emisor) {
            res.status(200).send({ message: 'Envia los datos necesarios' });

        }

        var mensaje = new Mensaje();
        mensaje.emisor = params.emisor;
        mensaje.receptor = params.receptor;
        mensaje.asunto = params.asunto;
        mensaje.texto = params.texto;
        mensaje.visto= 'false';

        mensaje.save((err, mensajeStored) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición"
                });
            }
            if (!mensajeStored) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error al enviar la petición"
                });
            }
            return res.status(200).send({
                status: 'sucess',
                mensaje: mensajeStored
            })
        })
    },

    getReceivedMessage: (req,res) =>{
        var userId=  req.params.id;
        var page= 1;
        if(req.params.page){
            page=req.params.page;
        }

        var itemsPerPage= 4;

        Mensaje.find({receptor: userId}).populate('emisor', 'nombre usuario apellidos telefono image').paginate(page, itemsPerPage, (err, mensajes, total) =>{
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición"
                });
            }
            if (!mensajes) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay mensajes"
                });
            }
            return res.status(200).send({
                status: 'sucess',
                total: total,
                pages: Math.ceil(total/itemsPerPage),
                mensajes
            });

        })

    },
    getEmittedMessage: (req,res) =>{
        var userId=  req.params.id;
        var page= 1;
        if(req.params.page){
            page=req.params.page;
        }

        var itemsPerPage= 4;

        Mensaje.find({emisor: userId}).populate('emisor receptor', 'nombre usuario apellidos telefono image').paginate(page, itemsPerPage, (err, mensajes, total) =>{
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición"
                });
            }
            if (!mensajes) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay mensajes"
                });
            }
            return res.status(200).send({
                status: 'sucess',
                total: total,
                pages: Math.ceil(total/itemsPerPage),
                mensajes
            });

        })

    },

    getMensajesNoVisto: (req, res) =>{
        var userId= req.params.id;

        Mensaje.count({receptor: userId, visto:'false'}).exec((err,count)=>{
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición"
                });
            }
        
            return res.status(200).send({
                status: 'sucess',
                noleidos: count
            });
        })
    },

    setMensajesVisto: (req, res)=>{
        var userId= req.params.id;

        Mensaje.update({receptor: userId, visto:'false'}, {visto:'true'}, {"multi": true}, (err, mensajeUpdate)=>{
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición"
                });
            }
            return res.status(200).send({
                status: 'sucess',
                mensajeUpdate
            });
        })
    }

};

module.exports = controllers;
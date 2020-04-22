'use strict'

var validator = require('validator');
var Documento = require('../models/documento');
var fs = require('fs');
var path = require('path');

var controllers = {

    save: (req, res) => {

        var params = req.body;
        //var userN=req.params.user;

        console.log(params);
        try {
            var validate_title = !validator.isEmpty(params.title);
            // var validate_url=!validator.isEmpty(params.url);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }

        if (validate_title /*&& validate_url*/) {
            var documento = new Documento();

            //asignar valores
            documento.title = params.title;

           if (params.url) {
                var file = params.url;
                var file_split = file.split('\.');
                var file_ext = file_split[1];
                console.log("file_ext:" + file_ext);
                if (file_ext == "txt" || file_ext == "doc") {
                    //documento.url='../assets/images/word.png';
                    documento.tipoDocumento = "word.png";
                } else if (file_ext == "xls" || file_ext == "xlm" || file_ext == "xlt") {
                    //documento.url='../assets/images/default.png';
                    documento.tipoDocumento = "default.png";
                } else if (file_ext == "pdf") {
                    //documento.url='../assets/images/pdf.png';
                    documento.tipoDocumento = "pdf.png";
                } else if (file == "png" || file_ext == "jpg" || file_ext == "jpeg" || file_ext != "gif") {
                    documento.tipoDocumento = "imagen";
                }
             documento.url=params.url;
            } else {
                //documento.url = '../assets/images/default.png';
                documento.tipoDocumento = "default.png";
                documento.url="default.png";
                
            }


            
            documento.alumnoNombre = params.nombre;

          /*  if (params.comentario) {
                documento.comentario = params.comentario;
            } else {
                documento.comentario = null;
            }*/


            //Guardar el objeto

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
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos'
            });
        }
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

   upload: (req, res) => {

        var filename = 'Imagen no subida';

        if (!req.files) {
            return res.status(400).send({
                status: 'error',
                message: filename
            });
        }

        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

     //  var file_name = file_split[file_split.length-1];
        var file_name=file_split[2];
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

       if (file_ext != 'png' && file_ext != "jpg" && file_ext != "jpeg" && file_ext != "gif") {
            fs.unlink(file_path, (err) => {  //eliminar un fichero
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida'
                });
            });
        } else {

            var documentoId = req.params.id;
           // console.log("documentoId:" + req.params.id)
            Documento.findOneAndUpdate({ _id: documentoId }, { url: file_name }, { new: true }, (err, documentoUpdated) => {
                if (err || !documentoUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'error al guardar la imagen'
                    });
                }

                return res.status(200).send({
                    status: 'sucess',
                    documento: documentoUpdated
                });

            });
        }

       

     

    },

 getImage: (req, res) =>{
        var file = req.params.image;
        var path_file = './upload/documentos/'+file;

        fs.exists(path_file, (exists) =>{
        
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status:'error', 
                    message: 'la imagen no existe'
                 });
        
            }
        });

       

    },

};

module.exports = controllers;
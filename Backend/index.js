/******* CONEXION A LA BASE DE DATOS ***** */

'use strict'


var mongoose = require('mongoose');
var app=require('./app');


const client= require('socket.io').listen(3900).sockets;
const {addUser, removeUser, getUser, getUserInRoom} =require('./controllers/user');




//variables de entorno locales
require('dotenv').config({path: 'variables.env'});

console.log(process.env.MONGO_URI);
 

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

 
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/baseerasmus",{ useUnifiedTopology: true, useNewUrlParser: true})
        .then(()=>{
            console.log('La conexion a la BD se ha realizado con exito');

           
        });

    

//LEER LOCAL HOST DE VARIABLE Y PUERTOS

const host= process.env.HOST || '0.0.0.0';
const port=  3900 ;



app.listen(port, host, ()=> {
    console.log('servidor corriendo en http://localhost:'+port + " " + host);

});


//Connect socket

client.on('connection', (socket) => {
   
    socket.on('join', ({name, room}, callback)=>{
        const {error, user}= addUser({id:socket.id, name, room});
        
        if(error) return callback (error);
        
        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name}, has joined!`});

        socket.join(user.room);

        client.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage', (message, callback)=>{
        console.log("hola");
        const user=getUser(socket.id);
        console.log("usuario: " + user.id + user.room);

        client.to(user.room).emit('message', {user:user.name, text:message});
        client.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});
        callback();
    });


    socket.on('disconnect', () => {
       const user= removeUser(socket.id);

       if(user){
           client.to(user.room).emit('message', {user:'admin', text:`${user.name} ha abandonad la sala.`})
       }
    })
    
});
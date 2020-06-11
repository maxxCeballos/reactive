'use strict'

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;

// salas de chat
const python = io.of('/python');
const javascript = io.of('/javascript');


app.get('/python/:user/:mensaje', (req, res) => {
    let dato = {
        user : req.params.user,
        mensaje: req.params.mensaje
    }
    python.emit('chat-message', dato);
})


python.on('connection', function(socket){

  socket.on("mensaje", mensaje => {

    python.emit('chat-message', mensaje);
  
  });

});


// javascript.on('connection', function(socket){

//   socket.on('dir-app-web', mensaje => {

//     javascript.emit('to-web', data)

//   });

// });


server.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
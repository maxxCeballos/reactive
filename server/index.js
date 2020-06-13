'use strict'

const app = require('express')(); // Import del modulo express.js
const server = require('http').createServer(app); // Import del servidor http
const io = require('socket.io')(server);  //Import del modulo socket.io
//const port = 3000;
const port = process.env.PORT || 3000;
// salas de chat
const python = io.of('/python');
const javascript = io.of('/javascript');

// app.get('/python/:user/:mensaje', (req, res) => {
//     let dato = {
//         user : req.params.user,
//         mensaje: req.params.mensaje
//     }
//     python.emit('chat-message', dato);
// })
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
  python.emit('chat-message', {
        user : 'NAHIR',
        mensaje: 'HOLAAA'
    });
});

// app.get('/', (req, res) => {
//   let dato = {
//       user : req.params.user,
//       mensaje: req.params.mensaje
//   }
//   python.emit('chat-message', {
//     user : 'NAHIR',
//     mensaje: 'HOLLAAA'
// });
// })

// Cuando hay una conexion...
io.on("connection", function (socket) {

  socket.on("name", function (name) {
    nombres.set(name, socket.id);
    clientes.set(socket.id, name);
    console.log("Se conecto " + name);
  });

  // Al recibir un mensaje, hacer...
  socket.on("messageTo", function (msg) {
    // Enviar mensaje a todos los nombres menos al emisor
    console.log(msg);
    var destinatario = nombres.get(msg.to);
    var emisor = clientes.get(socket.id);
    io.to(destinatario).emit('message', { "message": msg.message, "from": emisor });
  });

  socket.on("disconnect", function () {

    var userName=clientes.get(socket.id);
    console.log(userName+' Cerro la sesion');

    nombres.delete(clientes.get(socket.id))
    clientes.delete(socket.id);
  });


});

// python.on('connection', function(socket){

//   socket.on("mensaje", mensaje => {

//     python.emit('chat-message', mensaje);
  
//   });

// });


// javascript.on('connection', function(socket){

//   socket.on('dir-app-web', mensaje => {

//     javascript.emit('to-web', data)

//   });

// });


server.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
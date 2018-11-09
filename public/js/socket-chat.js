var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('el nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('chatEntrar', usuario, function(resp) {
        console.log('Usuarios conectados', resp)
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchat Cambios de usuarios
//cuando un usuario entra o sale del chat listaPersona

socket.on('listaPersona', function(personas) {

    console.log(personas);

});

// Mensajes Provados

socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado', mensaje)
});
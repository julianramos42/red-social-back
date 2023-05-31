#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../app.js'
import debug from 'debug'
const logger = debug('red-social-back:server')
import http from 'http'
import { Server } from 'socket.io'

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log("server ready on port "+port));
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  logger('Listening on ' + bind);
}

const io = new Server(server, {
  cors: {
      origin: 'https://jr-red-social.vercel.app',
      methods: ['GET', 'POST']
  }
});

const userSockets = [];
io.on('connection', (socket) => {
    socket.on('user Connect', (userId) => {
      console.log('User Conected')
        userSockets[userId] = socket.id;
    });

    socket.on('chat message', (msg) => {
        const senderId = socket.id;
        const recipientId = msg.receiver;

        const recipientSocketId = userSockets[recipientId];

        if (recipientSocketId) {
            io.to(recipientSocketId).emit('message received', msg);
        }
    });

    socket.on('disconnect', () => {
        const userId = Object.keys(userSockets).find(
            (key) => userSockets[key] === socket.id
        );
        if (userId) {
            delete userSockets[userId];
        }
    });
});
import express from 'express'
import 'dotenv/config.js'
import './config/database.js'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import { __dirname } from './utils.js'
import indexRouter from './routes/index.js'
import cors from 'cors'
import { errorHandler, errorNotFound } from './middlewares/error.js'
import http from 'http'
import { Server } from 'socket.io'

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

app.use('/', indexRouter);

const userSockets = [];
io.on('connection', (socket) => {
    socket.on('user Connect', (userId) => {
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

server.listen(8081, () => {
    console.log('Servidor escuchando en el puerto 8081');
});

app.use(errorNotFound)
app.use(errorHandler)

export default app
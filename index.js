const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    // cors:{
    // origin:"https://amazing-kirch-6a3942.netlify.app/",
    // methods: ["GET","POST"],
    // credentials: true,
    // allowEIO4: true
    // },
    transport: ['websocket']
});
const { addUser, getUser, removeUser, getUsersInRooms } = require('./users')

const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = process.env.PORT || 5000;

const router = require('./router');

app.use(router);

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const { error, user} = addUser({ id: socket.id, name, room});
        if (callback && error) return callback (error);

        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`});
        
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRooms(user.room)});

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: user.name, text: message });
        }
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRooms(user.room)});
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
        }
    });
});



http.listen(PORT, () => console.log(`Server has started on port ${PORT} `));
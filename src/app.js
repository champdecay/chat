const io = require('socket.io')(3001, {
    cors: {
        origin: '*'
    }
})

io.on("connection", socket => {
    socket.on("join", data => {
        socket.join(data.room)
        socket.broadcast.to(data.room).emit("new_user", data.user)
    })

    socket.on("send_message", (message) => {
        io.emit("new_message", message)
    })
})
const express=require('express')
const app=express()
const port=3000
const socketio=require('socket.io')
const path=require('path')
const http=require('http')

app.use(express.static(path.join(__dirname,'./public')))

const server=http.createServer(app)

const io=socketio(server)

io.on('connection',(socket)=>{
    console.log('New WebSocket connection')
    socket.emit('welcomemessage','Welcome to the chat!')
    // socket.broadcast.emit('message','A new user has joined!')
    // socket.on('sendMessage',(message)=>{
    //     io.emit('message',message)
    // })
    // socket.on('disconnect',()=>{
    //     io.emit('message','A user has left!')
    // })
    socket.on('connected',(data)=>{
        console.log(data);
    })
})

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
})


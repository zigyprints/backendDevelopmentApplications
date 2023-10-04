const socket=io()

socket.on('welcomemessage',(data)=>{
    console.log(data)
}) 

socket.emit('connected','Hello from the client!')
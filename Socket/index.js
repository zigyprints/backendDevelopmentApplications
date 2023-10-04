const { Server } = require("socket.io");
const io = new Server ({cors:"http://localhost:5173"})

let onlineUsers = [];

io.on("connection", (socket)=>{
    
    //listen to a connection 
    socket.on("addNewUser",(userId) =>{
        try {
            !onlineUsers.some((user)=>user.userId === userId) && 
            onlineUsers.push({
                userId,
                socketId: socket.id
            }) 
            console.log(onlineUsers,socket.id);
    
            io.emit("getOnlineUsers",onlineUsers)
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("disconnect",()=>{
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers",onlineUsers);
    })


    // add message
    socket.on("sendMessage",(message)=>{
        const user = onlineUsers.find((user) => user.userId === message.recipientId)
        if(user){
            io.to(user.socketId).emit("getMessage",message);
        }
    })

});

io.listen(5000)
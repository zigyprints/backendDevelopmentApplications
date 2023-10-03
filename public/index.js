const cookies_map = {};
for (const keyVal of document.cookie.split("; ")) {
    const cookie_split = keyVal.split("=");
    cookies_map[cookie_split[0]] = decodeURIComponent(cookie_split[1]);
}
document.getElementById("room_id").innerText = `Room ID: ${cookies_map.room_id}`;

const socket = io("http://localhost:4000/", {
    query: {token: cookies_map.chat_token, room_id: cookies_map.room_id}
});

socket.on("connect", () => {
    console.log("Connection Successful!")
})

function sendMessage() {
    const messageInput = document.getElementById("message-input");
    if (messageInput.value.length > 0) {
        socket.emit("chat", messageInput.value);
        messageInput.value = ""; 
    }
}

socket.on("chat-from-server", payload => {
    const message = `${payload.sender}: ${payload.message}`
    let pElm = document.createElement("p");
    pElm.textContent = message;
    const messageContainer = document.getElementById("msg-container");
    messageContainer.appendChild(pElm);
})

function sendImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imageData = reader.result.split(',')[1];

        socket.emit('image-send', imageData);
      };
    }
  }

socket.on('image-from-server', (data) => {
    const messageContainer = document.getElementById("msg-container");
    const imgElement = document.createElement('img');
    imgElement.src = 'data:image/jpeg;base64,' + data.image;
    imgElement.width = 200;
    messageContainer.appendChild(imgElement);

    const message = `~ ${data.sender}`
    let pElm = document.createElement("p");
    pElm.textContent = message;
    messageContainer.appendChild(pElm);
});
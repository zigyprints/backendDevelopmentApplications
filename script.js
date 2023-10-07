const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const imageInput = document.getElementById("image-input");

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.senderName}: ${data.message}`);
  if (data.image) {
    appendImage(data.image);
  }
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const imageData = imageInput.files[0];
  appendMessage(`You: ${message}`);

  socket.emit("send-chat-message", { message, roomId, imageData });
  messageInput.value = "";
  imageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function appendImage(imageSrc) {
  const imageElement = document.createElement("img");
  imageElement.src = imageSrc;
  messageContainer.append(imageElement);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const imageInput = document.getElementById('image-input');
const roomId = 'rooms';
const name = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new-user', name);
socket.on('chat-message', (data) => {
    appendMessage(`${data.senderName}: ${data.message}`);
    if (data.image) {
        appendImage(data.image);
    }
});
socket.on('user-connected', (connectedName) => {
    appendMessage(`${connectedName} connected`);
});
socket.on('user-disconnected', (disconnectedName) => {
    appendMessage(`${disconnectedName} disconnected`);
});
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const imageInput = document.getElementById('image-input');
    if (imageInput) {
        const imageData = imageInput.files ? imageInput.files[0] : null;
        if (imageData) {
            appendMessage(`You: ${message}`);
            socket.emit('send-chat-message', { message, roomId, imageData });
            messageInput.value = '';
            imageInput.value = '';
        }
        else {
            const errorMessageElement = document.createElement('div');
            errorMessageElement.innerText = 'Please select an image.';
            errorMessageElement.style.color = 'red';
            messageContainer.appendChild(errorMessageElement);
            setTimeout(() => {
                errorMessageElement.remove();
            }, 5000);
        }
    }
});
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
}
function appendImage(imageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    messageContainer.appendChild(imageElement);
}

import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container') as HTMLDivElement;
const messageForm = document.getElementById('send-container') as HTMLFormElement;
const messageInput = document.getElementById('message-input') as HTMLInputElement;
const imageInput = document.getElementById('image-input') as HTMLInputElement;

const roomId: string = 'rooms'; 

const name = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new-user', name);

socket.on('chat-message', (data: { senderName: string; message: string; image?: string }) => {
  appendMessage(`${data.senderName}: ${data.message}`);
  if (data.image) {
    appendImage(data.image);
  }
});

socket.on('user-connected', (connectedName: string) => {
  appendMessage(`${connectedName} connected`);
});

socket.on('user-disconnected', (disconnectedName: string) => {
  appendMessage(`${disconnectedName} disconnected`);
});


messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message: string = messageInput.value;
  const imageInput = document.getElementById('image-input') as HTMLInputElement;

  if (imageInput) {
    const imageData: File | null = imageInput.files ? imageInput.files[0] : null;

    if (imageData) {
      appendMessage(`You: ${message}`);
      socket.emit('send-chat-message', { message, roomId, imageData });
      messageInput.value = '';
      imageInput.value = '';
    } else {
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




function appendMessage(message: string) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement);
}

function appendImage(imageSrc: string) {
  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;
  messageContainer.appendChild(imageElement);
}

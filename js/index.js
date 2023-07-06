const startGame = () => {
  const playBtn = document.querySelector(".icon");
  const match = document.querySelector(".chatbot");
  const close = document.querySelector(".close-btn");

  playBtn.addEventListener("click", () => {
    playBtn.classList.add("fadeOut");
    match.classList.add("fadeIn");
  });

  close.addEventListener("click", () => {
    match.classList.remove("fadeIn");
    playBtn.classList.remove("fadeOut");
  });
};

startGame();

const inputField = document.querySelector('.chat-footer input[type="text"]');
const sendButton = document.querySelector('.chat-footer .send-btn');
const messagesContainer = document.querySelector('.chat-body .messages');

// Function to create and append a message to the chat interface
function appendMessage(content, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.innerHTML = `<p>${content}</p>`;
  messagesContainer.appendChild(messageDiv);
}

// Function to handle user input and bot response
function handleUserInput() {
  const userMessage = inputField.value;
  appendMessage(userMessage, 'sent');
  inputField.value = '';

  // Send the user message to the server for processing
  fetch('/process-user-input', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => appendMessage(data.message, 'received'))
    .catch(error => console.error('Error:', error));
}

// Event listeners for user input
sendButton.addEventListener('click', handleUserInput);
inputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleUserInput();
  }
});

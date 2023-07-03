// Initialize the OpenAI library with your API key
openai.init('YOUR_API_KEY');

// Create a function to send a message to ChatGPT
async function sendMessage(message) {
  // Send a POST request to the ChatGPT API
  const response = await openai.complete({
    engine: 'text-davinci-003',
    prompt: 'You are User: ' + message,
    maxTokens: 50,
    temperature: 0.7,
    n: 1,
    stop: ['\n']
  });

  // Return the generated message
  return response.choices[0].text;
}

// Function to handle user messages and update the chat interface
async function handleUserMessage() {
  // Get the user input message
  const userInput = document.getElementById('user-input').value;

  // Clear the input field
  document.getElementById('user-input').value = '';

  // Add the user message to the chat container
  addMessage('user', userInput);

  // Send the user message to ChatGPT and get the generated response
  const botResponse = await sendMessage(userInput);

  // Add the bot response to the chat container
  addMessage('bot', botResponse);
}

// Function to add a message to the chat container
function addMessage(role, content) {
  const chatContainer = document.getElementById('chat-container');

  // Create a new message element
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  messageElement.textContent = content;

  // Append the message element to the chat container
  chatContainer.appendChild(messageElement);
}

// Add an event listener to the submit button
document.getElementById('submit-button').addEventListener('click', handleUserMessage);

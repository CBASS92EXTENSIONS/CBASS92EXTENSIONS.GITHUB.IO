// Create a function to send a message to ChatGPT
async function sendMessage(message) {
  // Send a POST request to the ChatGPT API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
    body: JSON.stringify({
      'messages': [{'role': 'system', 'content': 'You are User'}, {'role': 'user', 'content': message}],
    }),
  });

  // Parse the response JSON
  const data = await response.json();

  // Return the generated message
  return data.choices[0].message.content;
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

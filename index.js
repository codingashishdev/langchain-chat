const query = document.querySelector('#query');
const submit = document.querySelector('#submit');
const chatMessages = document.querySelector('#chat-messages');

query.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submit.click();
  }
});

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const queryData = query.value.trim();
  if (!queryData) return;
  
  addMessage(queryData, 'user');
  
  query.value = '';
  
  try {
    const typingIndicator = addTypingIndicator();
    
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: queryData })
    });
    
    const result = await response.json();
    typingIndicator.remove();
    
    addMessage(result.data, 'ai');
    
    scrollToBottom();
  } catch (error) {
    console.error('Error:', error);
    addMessage('Sorry, there was an error processing your request.', 'ai');
  }
});

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
  messageDiv.innerHTML = formatMessage(text);
  chatMessages.appendChild(messageDiv);
  
  scrollToBottom();
  return messageDiv;
}

function formatMessage(text) {
  text = text.replace(/```(.+?)```/gs, '<pre>$1</pre>');  
  text = text.replace(/\n/g, '<br>');
  return text;
}

function addTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('message', 'ai-message', 'typing-indicator');
  typingDiv.innerHTML = 'Thinking<span>.</span><span>.</span><span>.</span>';
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
  return typingDiv;
}

function scrollToBottom() {
  const messagesContainer = document.querySelector('.messages-container');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

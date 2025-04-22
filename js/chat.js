document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWidget = document.querySelector('.chat-widget');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');

    // Generate a unique session ID
    const sessionId = Math.random().toString(36).substring(2);

    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.add('active');
        chatToggle.style.display = 'none';
        chatInput.focus();
    });

    // Close chat widget
    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        chatToggle.style.display = 'flex';
    });

    // Send message
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Disable input and button while processing
        chatInput.disabled = true;
        chatSend.disabled = true;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        typingIndicator.classList.add('active');
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Send message to local server
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Remove typing indicator
            typingIndicator.remove();

            // Add bot response
            if (data.response) {
                addMessage(data.response, 'assistant');

                // Update conversation history if provided
                if (data.history) {
                    // Clear messages and re-add from history
                    chatMessages.innerHTML = '';
                    data.history.forEach(msg => {
                        addMessage(msg.content, msg.role);
                    });
                }
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.remove();
            addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
        } finally {
            // Re-enable input and button
            chatInput.disabled = false;
            chatSend.disabled = false;
            chatInput.focus();
        }
    }

    // Add message to chat
    function addMessage(text, type) {
        const message = document.createElement('div');
        message.classList.add('message', `${type}-message`);
        
        // Convert URLs to clickable links
        const linkedText = text.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        
        message.innerHTML = linkedText;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on button click
    chatSend.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add initial bot message
    setTimeout(() => {
        addMessage("Hello! I'm your Campus Recreation Assistant. I can help you with information about facility hours, fitness programs, equipment, and general inquiries. How can I help you today?", 'assistant');
    }, 500);
});

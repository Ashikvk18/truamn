require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const app = express();

// Check for required environment variables
if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY is not set in environment variables');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('.'));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// Store conversation history (limit to last 10 messages per session)
const conversations = new Map();
const MAX_HISTORY = 10;

app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get or create conversation history
        let history = conversations.get(sessionId) || [];
        
        // Add user message to history
        history.push({ role: 'user', content: message });
        
        // Keep only the last MAX_HISTORY messages
        if (history.length > MAX_HISTORY) {
            history = history.slice(history.length - MAX_HISTORY);
        }

        // Prepare messages for API call
        const messages = history.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        // Call Anthropic API
        const response = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            temperature: 0.7,
            system: 'You are a helpful assistant for the Campus Recreation Center. You can help with information about facility hours, fitness programs, equipment, and general inquiries. Be friendly, concise, and accurate in your responses. The current facility hours are: Monday-Thursday: 6:30am-10:00pm, Friday: 6:30am-7:00pm, Saturday-Sunday: 11:00am-6:00pm.',
            messages: messages
        });

        // Store the assistant's response in history
        const assistantMessage = response.content[0].text;
        history.push({ role: 'assistant', content: assistantMessage });
        conversations.set(sessionId, history);

        res.json({ 
            response: assistantMessage,
            history: history
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

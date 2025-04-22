# Campus Recreation Website

A website for the campus recreation center with features including a chatbot assistant powered by Anthropic's Claude API.

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd rec-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your Anthropic API key:
     ```
     ANTHROPIC_API_KEY=your_api_key_here
     ```

4. Start the server:
```bash
node server.js
```

5. Open `http://localhost:3000` in your browser

## Features

- Interactive chatbot assistant
- Facility information
- Program schedules
- Equipment guides
- And more...

## Development

The project uses:
- Node.js with Express for the backend
- Anthropic's Claude API for the chatbot
- HTML/CSS/JavaScript for the frontend

## Environment Variables

Required environment variables:
- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude

## Security Notes

- Never commit the `.env` file to version control
- Always use environment variables for sensitive data
- Keep your API keys secure and rotate them if compromised

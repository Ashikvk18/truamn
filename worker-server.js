const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 4001; // Separate port for worker portal

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.redirect('/worker/login.html');
});

app.get('/worker/*', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Worker portal running on http://localhost:${PORT}/worker/login.html`);
}).on('error', (err) => {
    console.error('Server error:', err.message);
    if (err.code === 'EADDRINUSE') {
        console.log('Port is already in use. Try using a different port.');
    }
});

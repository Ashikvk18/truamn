const { spawn } = require('child_process');
const path = require('path');

// Start the Flask server using the virtual environment's Python
const pythonProcess = spawn(path.join(__dirname, 'venv', 'Scripts', 'python'), ['-m', 'flask', 'run', '--port=5000']);

pythonProcess.stdout.on('data', (data) => {
    console.log(`Flask server output: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
    console.error(`Flask server error: ${data}`);
});

pythonProcess.on('close', (code) => {
    console.log(`Flask server process exited with code ${code}`);
});

const express = require('express');
const path = require('path');

// Initialize Express app
const app = express();
app.use(express.static('static'));

// Main route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'simple-index.html'));
});

// API endpoint for testing
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'Node.js server is running' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from Node.js backend!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

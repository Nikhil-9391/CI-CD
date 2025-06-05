const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes - JSON responses
app.get('/api', (req, res) => {
  res.send({
    message: 'DevOps CI/CD Pipeline Demo',
    status: 'success',
    timestamp: new Date()
  });
});

// Health check endpoint (useful for monitoring)
app.get('/api/health', (req, res) => {
  res.status(200).send({
    status: 'UP',
    version: process.env.VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API endpoint example
app.get('/api/info', (req, res) => {
  res.json({
    app: 'DevOps Demo Application',
    technology: 'Node.js with Express',
    features: [
      'CI/CD Pipeline Integration',
      'Automated Testing',
      'Containerization Ready',
      'Environment Configuration'
    ]
  });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// For any other routes, serve the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Access the application at http://localhost:${port}`);
});

// Export for testing
module.exports = { app, server };
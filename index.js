const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // You can change the port number as needed

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to the Currency Exchange App');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

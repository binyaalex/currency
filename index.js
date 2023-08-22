const express = require('express');
const path = require('path');
const { getExchangeRates } = require('./helpers/exchangeRate');
const mime = require('mime'); // Import the 'mime' module
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    res.setHeader('Content-Type', mime.getType(filePath)); // Set the appropriate content type
  }
}));

app.get('/getExchangeRates', async (req, res) => {
    try {
      const exchangeRates = await getExchangeRates();
      // Pass the exchangeRates data
      res.json(exchangeRates);
    } catch (error) {
      res.status(500).send('An error occurred while fetching exchange rates.');
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

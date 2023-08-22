const axios = require('axios');

const API_KEY = '688f6d5b2b8a49c4953d506bf4d7afb5'; // Replace with your actual API key
const BASE_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest';

async function getExchangeRates() {
  try {
    const response = await axios.get("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=688f6d5b2b8a49c4953d506bf4d7afb5");
    const exchangeRates = response.data.rates;
    return exchangeRates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}

module.exports = {
  getExchangeRates,
};

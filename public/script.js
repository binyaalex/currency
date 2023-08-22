// script.js
console.log(1);
const baseCurrency = document.getElementById('Amount');
const convertButton = document.getElementById('convertButton');

const ilsAmount = document.getElementById('ilsAmount');
const eurAmount = document.getElementById('eurAmount');
const gbpAmount = document.getElementById('gbpAmount');
const jpyAmount = document.getElementById('jpyAmount');

const exchangeRates = {
  ILS: 0.28,
  EUR: 0.23,
  GBP: 0.20,
  JPY: 30.00
};
let amountOfBase = 0
convertButton.addEventListener('click', () => {
    amountOfBase = parseFloat(baseCurrency.value);

});

// Function to fetch exchange rates from the server
async function fetchExchangeRates() {
    try {
      const response = await fetch('/getExchangeRates'); // Replace with your actual endpoint
      if (response.ok) {
        const exchangeRates = await response.json();
        return exchangeRates;
      } else {
        console.error('Failed to fetch exchange rates:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching exchange rates:', error);
    }
  }
  
  // Function to perform currency conversion using exchange rates
  function convertCurrency(amount, fromCurrency, toCurrency, exchangeRates) {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
  
    if (fromRate && toRate) {
      const convertedAmount = (amount / fromRate) * toRate;
      return convertedAmount;
    } else {
      console.error('Exchange rates for selected currencies not available.');
      return null;
    }
  }
  
  // Event listener for the Convert button
  document.getElementById('convertButton').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('Amount').value);
    const fromCurrency = 'ILS';
    const toCurrency = 'USD'; // Replace with the desired target currency
  
    const exchangeRates = await fetchExchangeRates();
    if (exchangeRates) {
        console.log(exchangeRates);
        ilsAmount.textContent = (amountOfBase * exchangeRates.ILS).toFixed(2);
        eurAmount.textContent = (amountOfBase * exchangeRates.EUR).toFixed(2);
        gbpAmount.textContent = (amountOfBase * exchangeRates.GBP).toFixed(2);
        jpyAmount.textContent = (amountOfBase * exchangeRates.JPY).toFixed(2);
    //   const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency, exchangeRates);
    //   if (convertedAmount !== null) {
    //     document.getElementById('usdAmount').textContent = convertedAmount.toFixed(2);
    //   }
    }
  });
  

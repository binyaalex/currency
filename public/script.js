// script.js
const currencies = {
    main: 'USD',
    others: ['EUR', 'ILS', 'GBP', 'JPY'],
};
  
  function populateCurrencies() {
    const mainCurrencyElement = document.getElementById('mainCurrency');
    const mainFlag = document.getElementById('mainFlag');
    mainCurrencyElement.textContent = currencies.main;
    mainFlag.src = `${currencies.main.toLowerCase()}_flag.png`;

    const othersContainer = document.getElementById('othersContainer');
    othersContainer.innerHTML = currencies.others
      .map((currency) => `<div class="currency" id="${currency.toLowerCase()}" onclick="swapCurrencies('${currencies.main}', '${currency}')">
        <img class="flag" src="${currency.toLowerCase()}_flag.png" alt="${currency} Flag">
        <span id="${currency.toLowerCase()}Amount"></span>${currency}
      </div>`)
      .join('');
  }
  
  function swapCurrencies(currentMain, selectedCurrency) {
    const mainCurrencyElement = document.getElementById('mainCurrency');
    const selectedCurrencyIndex = currencies.others.indexOf(selectedCurrency);
    if (selectedCurrencyIndex !== -1) {
      currencies.others[selectedCurrencyIndex] = currencies.main;
      currencies.main = selectedCurrency;
      populateCurrencies();
    }
  }
  
  // Populate currencies on page load
  populateCurrencies();
  

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
//   function convertCurrency(amount, fromCurrency, toCurrency, exchangeRates) {
//     const fromRate = exchangeRates[fromCurrency];
//     const toRate = exchangeRates[toCurrency];
  
//     if (fromRate && toRate) {
//       const convertedAmount = (amount / fromRate) * toRate;
//       return convertedAmount;
//     } else {
//       console.error('Exchange rates for selected currencies not available.');
//       return null;
//     }
//   }
  
    // Function to calculate equivalent amounts for other currencies based on main currency
    function calculateEquivalentAmounts(amount, mainCurrency, exchangeRates) {
        console.log(amount);
        console.log(mainCurrency);
        console.log(exchangeRates);
        const equivalentAmounts = {};
        for (const currency of currencies.others) {
            equivalentAmounts[currency] = (amount / exchangeRates[mainCurrency]) * exchangeRates[currency];
        }
        console.log(equivalentAmounts);
        return equivalentAmounts;
    }

  // Event listener for the Convert button
  document.getElementById('convertButton').addEventListener('click', async () => {
    // const amount = parseFloat(document.getElementById('Amount').value);
    const fromCurrency = currencies.main;
    // const toCurrency = 'USD'; // Replace with the desired target currency
  
    const exchangeRates = await fetchExchangeRates();
    if (exchangeRates) {
        console.log(exchangeRates);
        if (currencies.main === "USD") {
            ilsAmount.textContent = (amountOfBase * exchangeRates.ILS).toFixed(2);
            eurAmount.textContent = (amountOfBase * exchangeRates.EUR).toFixed(2);
            gbpAmount.textContent = (amountOfBase * exchangeRates.GBP).toFixed(2);
            jpyAmount.textContent = (amountOfBase * exchangeRates.JPY).toFixed(2);
        } else {
            const equivalentAmounts = calculateEquivalentAmounts(amountOfBase, fromCurrency, exchangeRates);
            console.log(equivalentAmounts);
            for (const currency of currencies.others) {
                const mainEquivalentAmount = (amountOfBase / exchangeRates[currency]) * exchangeRates[fromCurrency];
                document.getElementById(`${currency.toLowerCase()}Amount`).textContent = equivalentAmounts[currency].toFixed(2);
            }
        }
    }
  });
  

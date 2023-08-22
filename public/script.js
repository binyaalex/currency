// script.js
console.log(1);
const shekelInput = document.getElementById('shekelAmount');
const convertButton = document.getElementById('convertButton');

const usdAmount = document.getElementById('usdAmount');
const eurAmount = document.getElementById('eurAmount');
const gbpAmount = document.getElementById('gbpAmount');
const jpyAmount = document.getElementById('jpyAmount');

const exchangeRates = {
  usd: 0.28,
  eur: 0.23,
  gbp: 0.20,
  jpy: 30.00
};

convertButton.addEventListener('click', () => {
  const amountInShekels = parseFloat(shekelInput.value);

  usdAmount.textContent = (amountInShekels * exchangeRates.usd).toFixed(2);
  eurAmount.textContent = (amountInShekels * exchangeRates.eur).toFixed(2);
  gbpAmount.textContent = (amountInShekels * exchangeRates.gbp).toFixed(2);
  jpyAmount.textContent = (amountInShekels * exchangeRates.jpy).toFixed(2);
});

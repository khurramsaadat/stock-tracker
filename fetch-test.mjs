import fetch from 'node-fetch';

fetch('https://finance.yahoo.com/quote/AAPL')
  .then(r => console.log(r.status))
  .catch(console.error);

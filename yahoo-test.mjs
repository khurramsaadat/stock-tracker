import yahooFinance from 'yahoo-finance2';

yahooFinance.quote('AAPL')
  .then(data => console.log(data))
  .catch(console.error);

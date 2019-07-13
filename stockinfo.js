const axios = require('axios');
const { alpha_vantage_key } = require('./keys.js');

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);



const getStockQuote = function(symbol) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alpha_vantage_key}`;
  axios.get(url)
    .then(res => res.data)
    .then(stock => stock['Global Quote'])
    .then(data => {
      let symbol = data['01. symbol'];
      let price = data['05. price'];
      let change = data['10. change percent'];
      console.log(`${symbol} last price was $${price} with a change of ${change} from the previous close.`);
    })
    .catch(err => console.log(err));
};

const keyMap = new Map([
  ['a', 'AAPL'],
  ['s', 'WORK'],
  ['d', 'DFS'],
  ['f', 'FB'],
  ['g', 'GOOGL'],
  ['t', 'TSLA'],
  ['y', 'YELP'],
  ['u', 'UBER'],
  ['l', 'LYFT'],
]);

const listKeys = function() {
  console.log('Key Mappings:  ')
  keyMap.forEach((stock, key) => {
    console.log(`${key} --> ${stock}`);
  });
};

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else if (key.name === 'l') {
    listKeys();
  } else {
    if (keyMap.has(str)) {
      getStockQuote(keyMap.get(str));
    } else {
      console.log('This key is not yet set up, please choose another stock');
      listKeys();
    }   
  }
});

console.log('Press a key to retrieve a stock price');
console.log();
console.log('Press l to list possible stocks to view');

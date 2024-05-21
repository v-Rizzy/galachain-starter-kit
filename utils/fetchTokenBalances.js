const axios = require('axios');
const testWallet = require('../.keys/test-default-keypair.json')

exports.fetchBalance = (walletAddress) => {
  let data = JSON.stringify({
    "owner": walletAddress || testWallet.walletAddress
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-galaswap.gala.com/galachain/api/asset/token-contract/FetchBalances',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  
  return axios.request(config)
  .then((response) => {
    console.log("Balance data: ", JSON.stringify(response.data));
    return response.data
  })
  .catch((error) => {
    console.log(error);
  });
}

// test
// this.fetchBalance('eth|94f9884D1B251ffDe06AF7Ef1141776bB77cA9ed')

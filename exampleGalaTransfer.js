const axios = require('axios');
const testWallet = require('./.keys/test-default-keypair.json')
const crypto = require('crypto')
const { signObject } = require('./utils/signGalaTxnObject')
const { fetchBalance } = require('./utils/fetchTokenBalances')

let tokenAmount = "0.00000001" // decimal number in string or BigNumber.js
let recieverAddress = "eth|6272ED0F9A6fe8A41176342a5754a88ee5ebA787" // use actual receiver address

let rawdata = {
  "signerPublicKey": testWallet.galaPublicKey,
  "uniqueKey": `galaswap-operation-${crypto.randomUUID()}`, // kinda treated like a nonce
  "from": testWallet.walletAddress,                         // use corresponding private key to sign
  "to": recieverAddress,
  "tokenInstance": {
    "collection": "GALA",
    "category": "Unit",
    "type": "none",
    "additionalKey": "none",
    "instance": "0"
  },
  "quantity": tokenAmount
};

const signature = signObject(rawdata, testWallet.privateKey)
if (JSON.parse(signature).signature) console.log('Successfully signed DTO using private key')

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api-galaswap.gala.com/galachain/api/asset/token-contract/TransferToken',
  headers: { 
    'X-Wallet-Address': testWallet.walletAddress,
    'Content-Type': 'application/json'
  },
  data: signature
};

axios.request(config)
.then((response) => {
  // console.log(JSON.stringify(response.data));
  if(response.status != 201) throw response.data
  return response.data
})
.catch((error) => {
  console.log(JSON.stringify(error.response.data));
}).finally(() => {
  // check if wallet balance is updated after transfer
  fetchBalance(recieverAddress)
});

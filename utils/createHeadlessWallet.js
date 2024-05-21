const axios = require('axios');
const ethers = require('ethers');
const fs = require('fs');
const crypto = require('crypto');

async function main() {
  // Generate random keypair for Galachain
  const newWallet = ethers.Wallet.createRandom();

  let data = JSON.stringify({
    "publicKey": newWallet.publicKey
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-galaswap.gala.com/v1/CreateHeadlessWallet',
    headers: { 
      'Content-Type': 'application/json'
    },
    data: data
  };

  // Register the headless wallet in Galachain backend
  let res = await axios.request(config)
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    console.log(error);
  });

  // Store the contents in a JSON file
  const fileContent = JSON.stringify({ ...newWallet, "privateKey": newWallet.privateKey, "walletAddress": `eth|${newWallet.address.replace('0x', '')}`, "galaPublicKey": res.publicKey })
  const filePath = `.keys/keypair-${crypto.randomUUID()}.json`
  
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('JSON file with wallet has been saved.');
    }
  });
}

main()

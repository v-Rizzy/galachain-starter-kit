# Galachain Starter Kit

## Installation
```
npm i
yarn install
```

## Reference
- utils/createHeadlessWallet: Generate a random ECDSA wallet and register the user
- utils/fetchTokenBalances: Use wallet address to fetch all balances of account
- utils/signGalaTxnObject: Generic function that returns an object signed using private key
- exampleGalaTransfer: Transfer Galachain native tokens from your wallet

## Usage
- Generate a new headless wallet detached from GalaGames UI
- Register the user with Galachain to obtain SignerPublicKey
- Update GalaTransfer code to use the new generated wallet stored in .keys folder
- Deposit Gala to your wallet public address (in "eth|..." format)
- Run the script to sign using your private key and transfer Gala
```
node createHeadlessWallet.js
node exampleGalaTransfer.js
```
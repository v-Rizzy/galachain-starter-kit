const stringify = require('json-stringify-deterministic') 
const EC = require('elliptic').ec;
const { keccak256 } = require('js-sha3')

const ecSecp256k1 = new EC('secp256k1');

exports.signObject = (
  obj,
  privateKey
) => {
  const toSign = { ...obj };

  if ('signature' in toSign) {
    delete toSign.signature;
  }

  const stringToSign = stringify(toSign);
  const stringToSignBuffer = Buffer.from(stringToSign);

  const keccak256Hash = Buffer.from(keccak256.digest(stringToSignBuffer));
  const privateKeyBuffer = Buffer.from(privateKey.replace(/^0x/, ''), 'hex');
  let signature;
  try {
    signature = Buffer.from(
      ecSecp256k1.sign(keccak256Hash, privateKeyBuffer).toDER()
    ).toString('base64');
  } catch (error) {
    throw error
  }

  return JSON.stringify({
    ...toSign,
    signature,
  });
}

const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair();

const publicK = key.getPublic('hex');
const privateK = key.getPrivate('hex');

console.log();
console.log(`Private Key ${privateK}`);

console.log();
console.log(`Public Key ${publicK}`);

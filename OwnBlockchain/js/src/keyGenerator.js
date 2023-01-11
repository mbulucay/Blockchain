const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const EncryptRsa = require('encrypt-rsa').default;
const nodeRSA = new EncryptRsa();

// generate a new key pair
const { privateKey, publicKey } = nodeRSA.createPrivateAndPublicKeys();

console.log(`Private Key ${privateKey}`);
console.log(`Public Key ${publicKey}`);

const encryptedText = nodeRSA.encryptStringWithRsaPublicKey({ 
    text: 'Blockchain based chat application',   
    publicKey,
});
console.log(encryptedText);

const decryptedText = nodeRSA.decryptStringWithRsaPrivateKey({ 
    text: encryptedText, 
    privateKey
});
console.log(decryptedText);


// while(1){
    // const key = ec.genKeyPair();
    // const publicK = key.getPublic('hex');
    // const privateK = key.getPrivate('hex');

    // console.log();
    // console.log(`Private Key ${privateK}`);

    // console.log();
    // console.log(`Public Key ${publicK}`);

    // console.log();
    // console.log("=================================================");
    // console.log();
    // break;"
// }
// N+VRx4ZIm8S06hHmea6Zj8Tsl0qUfrUe9iQqgCmGHkhrufRDHDMGvfxdAjOZX0G4KAzSTQLNqkDsXrkt8LeRrgebqTSSryRWWg+2w9l2zrykBl8JEDZuYjqVcUuK5N2CNrUeecsQMP5eHZTvRmocmICo7M/14THTkY4AxSTuIaWMOZ/NtBKFs95OhkhYBUCunqpvuHoU1NHLSQyZQTU/I+5CqJbQJBBqfvHZy0bqzHFZYtXRKoouWdtwxr+kWUueDI5/DEzO3Al1hSGYeFUIObMPg6UX4Fs70myG/F9soxpLaTJXj3WDddoL9lZr9yayaD/WrG+1CGGgNxHuxclcew==





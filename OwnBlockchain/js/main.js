const {Block} = require('./Block.js');
const {Blockchain} = require('./Blockchain.js');

let chain = new Blockchain();


console.log(`Mining 1`);
chain.addBlock(new Block({sender: "ali", receiver: "veli", content:"naber"}))

console.log(`Mining 2`);
chain.addBlock(new Block({sender: "veli", receiver: "ali", content:"iyi sen"}))

// console.log(JSON.stringify(chain, null, 4));
console.log(`Is chain valid? : ${chain.isValid()}`);

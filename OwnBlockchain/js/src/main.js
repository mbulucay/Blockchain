const {Blockchain} = require('./Blockchain.js');
const {Block} = require('./Block.js');
const {Message} = require('./Message.js')


let chain = new Blockchain();


// console.log(`Mining 1`);
// chain.addBlock(new Block({sender: "ali", receiver: "veli", content:"naber 1"}))
// chain.addBlock(new Block({sender: "ali", receiver: "veli", content:"nasilsin 1"}))


// console.log(`Mining 2`);
// chain.addBlock(new Block({sender: "veli", receiver: "ali", content:"iyi"}))
// chain.addBlock(new Block({sender: "veli", receiver: "ali", content:"seni sormali"}))
// chain.addBlock(new Block({sender: "veli", receiver: "ali", content:"sen nasilsin"}))


// console.log(JSON.stringify(chain, null, 4));
// console.log(`Is chain valid? : ${chain.isValid()}`);



chain.addMessage(new Message ("ali", "veli", "naber AA"));
chain.addMessage(new Message ("ali", "veli", "nasilsin AA"));

chain.addMessage(new Message ("veli", "ali", "iyi VV"))

chain.minePendingTransaction("bedo");

chain.addMessage(new Message ("veli", "ali", "iyi VV"))
chain.addMessage(new Message ("veli", "ali", "seni sormali VV"))
chain.addMessage(new Message ("veli", "ali", "sen nasilsin VV"))

chain.minePendingTransaction("veli");

chain.addMessage(new Message ("ali", "veli", "Iyi bizde AA"));
chain.addMessage(new Message ("ali", "veli", "Hafta sonu mac var AA"));

chain.minePendingTransaction("ali");

chain.addMessage(new Message ("ali", "veli", "Gelir misin AA"));
chain.addMessage(new Message ("veli", "ali", "hangi gun saat kacta VV"))


chain.minePendingTransaction("ali");

// chain.printBlocks()
console.log(chain.getSenderMessagesOfAddress("veli"));
console.log(chain.getReceiverMessagesOfAddress("veli"));




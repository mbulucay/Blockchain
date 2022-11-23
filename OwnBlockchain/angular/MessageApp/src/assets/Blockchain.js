const {Block} = require('./Block.js');
const {Message} = require('./Message.js')

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class Blockchain{

    // system keys
    // Private Key 8a4b34192df786b0e3fb7e673324f99bec6609c903a117b5418eaad3f1fa4805
    // Public Key 04470591955bc1f29054b5aa8a36e42b4417f8b708d63374906bcd38f02d3b339dc52709c8a4c54305106c10ecbd3e791f5d8de4bc80d85ae06ac8243dc767f937

    constructor(){
        this.blockchain = [this.generateGenesis()]
        this.difficulty = 2;
        this.pendingMessages = [];
    }


    generateGenesis(){
            
        let privateKey = ec.keyFromPrivate("0000000m0b0u0l0u0c0a0y000000000000000000000000000000000000000000");
        let messageAddress = privateKey.getPublic('hex');

        let msg = new Message(messageAddress , "mbulucay", `mbulucay thank you for your services`);
        msg.signMessage(privateKey);

        let arr = []
        arr.push(msg);
        return new Block(arr, "0");
    }


    getSize(){ return this.blockchain.length; }

    
    getLastBlock(){ return this.blockchain[this.blockchain.length - 1]; }

    
    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty)
        this.blockchain.push(newBlock);
    }


    minePendingMessages(miningRewardAddress){
        let block = new Block(this.pendingMessages, this.getLastBlock().hash);

        block.mineBlock(this.difficulty);
        console.log(`Block successfully mined`);
        console.log(`================================================`);

        // console.log(JSON.stringify(this.blockchain,  null, 5))
        this.blockchain.push(block);
        
        let privateKey = ec.keyFromPrivate("0000000m0b0u0l0u0c0a0y000000000000000000000000000000000000000000");
        let messageAddress = privateKey.getPublic('hex');

        let msg = new Message(messageAddress , miningRewardAddress, `${miningRewardAddress} thank you for your services`);
        msg.signMessage(privateKey);

        this.pendingMessages = [ msg ];
    }


    addMessage(message){

        if(!message.fromAddress || !message.toAddress){
            return new Error(`The message need from address and to address to be valid message `);
        }

        if(!message.isValid()){
            return new Error(`Cannot add invalid message in to chain`);
        }

        this.pendingMessages.push(message);
    }


    getSenderMessagesOfAddress(address){

        let messageList = [];
        for(const block of this.blockchain){

            for(const message of block["messages"]){
                if(message["fromAddress"] === address){
                    messageList.push(message);
                }
            }
        }
        return messageList;
    }


    getReceiverMessagesOfAddress(address){

        let messageList = [];
        for(const block of this.blockchain){
            for(const message of block["messages"]){
                if(message["toAddress"] === address){
                    messageList.push(message);
                }
            }
        }
        return messageList;
    }


    printBlocks(){

        // console.log(JSON.stringify(this.blockchain[1], null, 4));

        for(const block of this.blockchain){
            for (const [key, value] of Object.entries(block)) {
                console.log(key, value);
            }
            console.log();
            console.log("=================================");
            console.log("=================================");
            console.log("=================================");
            console.log();
        }
    }

    
    isValid(){

        for(let i=1; i<this.getSize(); i++){

            if(!this.blockchain[i].hasValidMessages()){
                return false;
            }

            if(this.blockchain[i].hash !== this.blockchain[i].calculateHash()){
                console.log(1);
                console.log(this.blockchain[i].hash);
                console.log(this.blockchain[i].calculateHash());
                return false;
            } 
            if(this.blockchain[i].previousHash !== this.blockchain[i-1].hash){
                console.log(2);
                console.log(this.blockchain[i].hash);
                console.log(this.blockchain[i].calculateHash());
                return false;
            }
        }

        return true;
    }
}

module.exports.Blockchain = Blockchain;
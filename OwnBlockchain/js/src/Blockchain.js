const {Block} = require('./Block.js');
const {Message} = require('./Message.js')

class Blockchain{

    constructor(){
        this.blockchain = [this.generateGenesis()]
        this.difficulty = 2;
        this.pendingMessages = [];
    }

    generateGenesis(){
        let m = new Message("system", "mbu", `Designer of the system`);
        let arr = []
        arr.push(m);
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

    minePendingTransaction(miningRewardAddress){
        let block = new Block(this.pendingMessages);

        block.mineBlock(this.difficulty);
        console.log(`Block successfully mined`);
        console.log(`================================================`);

        // console.log(JSON.stringify(this.blockchain,  null, 5))
        this.blockchain.push(block);

        this.pendingMessages = [
            new Message('system', miningRewardAddress, `${miningRewardAddress} thank you for your services`);
        ]
    }

    addMessage(message){

        if(!message.fromAddress || !message.toAddress){
            return new Error(`The message need from address and to address to be valid message `);
        }

        if(!message.inValid()){
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

        console.log(JSON.stringify(this.blockchain[1], null, 4));

        for(const block of this.blockchain){
            for (const [key, value] of Object.entries(block)) {
                console.log(key, value);
            }
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
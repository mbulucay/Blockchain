const {Block} = require('./Block.js');

class Blockchain{
    constructor(){
        this.blockchain = [this.generateGenesis()]
        this.difficulty = 5;
    }

    generateGenesis(){
        return new Block("Muhammed Bedir ULUCAY", 0)
    }

    getSize(){ return this.blockchain.length; }

    getLastBlock(){ return this.blockchain[this.blockchain.length - 1]; }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty)
        this.blockchain.push(newBlock);
    }

    isValid(){

        for(let i=1; i<this.getSize(); i++){
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
const SHA256 = require('crypto-js/sha256')

class Block{

    constructor(_data, _previousHash = ''){
        this.timestamp = Date.now().toString();
        this.data = _data;
        this.previousHash = _previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
    }


    mineBlock(difficulty){
        // while(this.hash.substring(0, difficulty) !== Array.from({ length: difficulty }).map(() => 0)){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Hash : ${this.hash}`);
    }

}

module.exports.Block = Block;
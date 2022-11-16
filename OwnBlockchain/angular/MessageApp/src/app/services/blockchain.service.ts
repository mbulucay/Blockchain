import { Injectable } from '@angular/core';

const EC = require('elliptic').ec;

const {Block} = require('../../assets/Block.js');
const {Blockchain} = require('../../assets/Blockchain.js');
const {Message} = require('../../assets/Message.js');


@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchain = new Blockchain();
  public walletKeys : any[] = [];

  constructor() { 
    this.blockchain.difficulty = 2;
    this.blockchain.minePendingTransaction("Owner Of The System Address");

    this.generateWalletKeys();

  }

  getBlocks(){
    return this.blockchain.blockchain;
  }

  private generateWalletKeys(){
    const ec = new EC.ec('secp256k1');
    const keyPair = ec.genKeyPair();
    
    this.walletKeys.push({
      keyObj: keyPair,
      publicKey: keyPair.getPublic('hex'),
      privateKey: keyPair.getPrivate('hex'),
    });

    console.log(this.walletKeys);

  }
}

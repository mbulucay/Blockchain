// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract gelen{

    struct Mesaj{
        address from;
        string content;
    }
    mapping(uint => Mesaj) m_mesaj;

    mapping(address => Mesaj[]) public addres_box;

    uint public counter = 0;

    constructor(){

    }

    function addMesaj(address _to /* , address _from*/ , string memory _content) public returns(bool){

        // if(_from != msg.sender) return false; 

        addres_box[_to].push(Mesaj(msg.sender, _content));
        counter++;

        return true;
    }

}
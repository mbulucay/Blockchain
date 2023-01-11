package blockchain

import (
	"bytes"
	"crypto/sha256"
)

type Message struct {
	Content string
	From    string
	To      string
}

type BlockChain struct {
	Blocks []*Block
}

type Block struct {
	Hash     []byte
	Data     Message
	PrevHash []byte
}

func (b *Block) DerivedHash() {

	info := bytes.Join([][]byte{b.PrevHash, []byte(b.Data.Content)}, []byte{})

	hash := sha256.Sum256(info)
	b.Hash = hash[:]
}

func CreateBlock(data Message, prevHash []byte) *Block {
	block := &Block{[]byte{}, data, prevHash}

	block.DerivedHash()
	return block
}

func (chain *BlockChain) AddBlock(data Message) {
	prevBlock := chain.Blocks[len(chain.Blocks)-1]
	new := CreateBlock(data, prevBlock.Hash)
	chain.Blocks = append(chain.Blocks, new)
}

func Genesis() *Block {

	tx := CreateMessage("This is genesis message", "0", "0")
	return CreateBlock(*tx, []byte{})
}

func InitBlockChain() *BlockChain {
	return &BlockChain{[]*Block{Genesis()}}
}

func CreateMessage(content string, from string, to string) *Message {
	return &Message{content, from, to}
}

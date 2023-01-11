package main

import (
	"fmt"
)

// type Message struct {
// 	Msg  string
// 	from string
// 	to   string
// }

// type BlockChain struct {
// 	Blocks []*Block
// }

// type Block struct {
// 	Hash     []byte
// 	Data     []byte
// 	PrevHash []byte
// }

// func (b *Block) DerivedHash() {
// 	info := bytes.Join([][]byte{b.Data, b.PrevHash}, []byte{})
// 	hash := sha256.Sum256(info)
// 	b.Hash = hash[:]
// }

// func CreateBlock(data string, prevHash []byte) *Block {
// 	block := &Block{[]byte{}, []byte(data), prevHash}
// 	block.DerivedHash()
// 	return block
// }

// func (chain *BlockChain) AddBlock(data string) {
// 	prevBlock := chain.Blocks[len(chain.Blocks)-1]
// 	new := CreateBlock(data, prevBlock.Hash)
// 	chain.Blocks = append(chain.Blocks, new)
// }

// func Genesis() *Block {
// 	return CreateBlock("Genesis", []byte{})
// }

// func InitBlockChain() *BlockChain {
// 	return &BlockChain{[]*Block{Genesis()}}
// }

func main() {
	chain := InitBlockChain()

	chain.AddBlock("11111111111")
	chain.AddBlock("22222222222")
	chain.AddBlock("33333333333")

	for _, block := range chain.Blocks {
		fmt.Printf("PrevHash: %x\n", block.PrevHash)
		fmt.Printf("Data: %s\n", block.Data)
		fmt.Printf("Hash: %x\n", block.Hash)
	}

}

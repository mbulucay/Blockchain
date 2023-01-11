package main

import (
	"fmt"
	b "p2pchatApp/blockchain"
)

func main() {

	chain := b.InitBlockChain()

	m1 := b.CreateMessage("11111111111", "0", "0")
	m2 := b.CreateMessage("22222222222", "0", "0")
	m3 := b.CreateMessage("33333333333", "0", "0")

	chain.AddBlock(*m1)
	chain.AddBlock(*m2)
	chain.AddBlock(*m3)

	for _, block := range chain.Blocks {
		fmt.Printf("PrevHash: %x\n", block.PrevHash)
		fmt.Printf("Data: %s\n", block.Data.Content)
		fmt.Printf("Hash: %x\n", block.Hash)
	}

}

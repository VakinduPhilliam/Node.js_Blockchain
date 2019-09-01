// Building a Blockchain with Node.js
// blockchain.js

//
// Building the blockchain
//


// Blockchain constructor

// To keep our blockchain simple, we’ll be storing our blocks in an array called chain.



class Blockchain {

  constructor() {

    this.chain = [this.createGenesis()];

    // add the difficulty to our Blockchain constructor

    this.difficulty = 4;

  }

  // blockchain functions...

  // Genesis block

  createGenesis() {
      return new Block(0, "01/01/2018", "Genesis block", "0");
  }

  // latest block 

  latestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // Add new block  

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;

    // Add mining difficulty function to new block

    newBlock.mineBlock(this.difficulty);

    this.chain.push(newBlock);
  }


  // Blockchain validation  

  checkValid() {

        for(let i = 1; i < this.chain.length; i++) {

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
  }


}


// 
// Genesis block
//
// All blockchains have an initial block, known as the genesis block. 
// We will also be creating this genesis block with a createGenesis() function and put it at index 0 in our array.
//

// For our genesis block, we have provided an index of 0, a random timestamp, a ”Genesis block” string as its data, and
// '0' as a random previous hash since there is no actual previous block.
//

//
// Adding blocks and getting latest block
//
// Since blockchains are meant to be composed of multiple blocks, we must add a latestBlock() and addBlock() function in
// our Blockchain class so we can actually form our chain.
//

// latestBlock() will retrieve the most recently created block that addBlock() will use to retrieve the previous hash. 

// addBlock() will then push the new block into the chain array.

//
// Chain Validation

// Since our blockchain is not actually decentralized on a P2P network, we’ll be implementing a simple validation function
// that makes sure all of our blocks are legit.

// This runs a ‘for’ loop, checking, by index, the blocks in the chain array by recalculating the hash and comparing it to
// the stored hash of the block. 

// If this returns true, it then checks whether the previous hash stored in the block matches the hash of the block before
// the current block.
//


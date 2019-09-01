// Building a Blockchain with Node.js
// block.js

//
// Building the block class
//


//
// A block in our blockchain will store an index, a timestamp, some data, the hash of the previous block, the block’s
// own hash, and a nonce value, which defines the “work” that miners do to honor the set difficulty.

// Create a blockchain.js file and start by making a constructor for the Block class in your chain.
//


// Import nececessary Node.js libraries
// import the SHA256 function from the crypto-js library.

const SHA256 = require("crypto-js/sha256");


// Create block

class Block {

  constructor(index, timestamp, data, previousHash = "") {

    this.index = index;
    this.timestamp = timestamp;
    this.data = data;

    this.previousHash = previousHash;
    this.hash = this.calculateHash();

    this.nonce = 0;

  }

  /// block functions...

  // We can now hash our block data. 

  // We’ll define the calculateHash() function , which will input the index, timestamp, data, previous hash, and the nonce value to
  // the SHA256() function and return the hash as a string.

  calculateHash() {

    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

  }

  // Mining Difficulty  

  mineBlock(difficulty) {

      while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
        this.nonce++;

        this.hash = this.calculateHash();

      }
      console.log("Block mined: " + this.hash);
    }





}


//
// If you would like to get the current timestamp instead of manually inputting the timestamp, you can specify this by using JavaScript’s
// Date() API above the Block class.
//

// var dt = new Date();
// var timestamp = dt.toString();
//

// Crypto Mining

// Mining is one method used to make blockchains more secure, especially in the case of cryptocurrency. 

// It allows implementing a proof of work protocol, which checks the legitimacy of the block mined and only validates once a consensus
// is reached by the nodes on the P2P network. 

// Mining also controls the flow of blocks into the chain; increasing the difficulty will increase the time needed to successfully mine
// a block. 
//

// To make it more difficult for our computer to create a block, we can define how a block’s hash should be. 
// In this case, we’ll be telling our computer to figure out a hash of a block beginning with a specific amount of 0’s.

// Our while loop takes a substring of a calculated hash, from index 0 to the index of the given value of the difficulty, and continues to
// run if this substring does not equal an array of 0’s that is the length of the given difficulty. 

// And since this loop will have multiple instances, we create a nonce value that changes every instance.

// To set the difficulty, let’s add the difficulty to our Blockchain constructor. 

// (Note that it will take much longer to mine a block with a difficulty greater than 5.
// For testing purposes, I recommend leaving it at 4.)
//

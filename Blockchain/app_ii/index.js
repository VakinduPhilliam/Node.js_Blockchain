// Building your own blockchain in JavaScript
// index.js

//
// The Block class
//

// A hash is a digital fingerprint of a piece of data. 
// The block hash makes it extremely difficult for anyone to alter the blockchain once a block has been confirmed.

const sha256 = require('sha256');


// create a new class so we have a template that we’ll use to build each block. 

// Each block on our simple blockchain will contain 5 pieces of data: 
// the block’s index, the precise time it was created, some arbitrary data 
// (for bitcoin, this data would be the addresses of the sender and receiver of bitcoin and the amount
// of the transaction), the hash value of the block preceding it, and a hash of itself. 
//



class Block {

  constructor(index, timestamp, data, prevHash) {

    this.index = index;
    this.timestamp = timestamp;

    this.data = data;
    this.prevHash = prevHash;

    this.thisHash = sha256(
      this.index + this.timestamp + this.data + this.prevHash
    );

  }


}

// Blockchain using NodeJS and Socket.io
// block.js

//
// The Block Model
//


const crypto = require('crypto');

const Transaction = require('./transaction');

// Create a block

class Block {

  constructor(index, previousBlockHash, previousProof, transactions) {

    this.index = index;
    this.proof = previousProof;

    this.previousBlockHash = previousBlockHash;
    this.transactions = transactions;

    this.timestamp = Date.now();

  }

  hashValue() {

    const { index, proof, transactions, timestamp } = this;
    const blockString= `${index}-${proof}-${JSON.stringify(transactions)}-${timestamp}`;

    const hashFunction = crypto.createHash('sha256');

    hashFunction.update(blockString);

    return hashFunction.digest('hex');

  }

  setProof(proof) {
    this.proof = proof;
  }

  getProof() {
    return this.proof;
  }

  getIndex() {
    return this.index;
  }

  getPreviousBlockHash() {
    return this.previousBlockHash;
  }

  /* Stringify and Parsing functions */
}

module.exports = Block;

//
// The important aspect of the Block is the hashValue() and previousBlockHash. 

// The hashValue() is responsible for creating the hash value of the block. 

// It generates a string expression of the block and that is sent to the NodeJS crypto module's createHash() function and hash
// is created using the specified sha256 algorithm. 

// The generated hash is then stored the next block in previousBlockHash.
//

// Blockchain using NodeJS and Socket.io
// chain.js

//
// The Chain Model
//

const Block = require('./block');

const actions = require('../constants');

const { generateProof, isProofValid } = require('../utils/proof');

// Create the blockchain

class Blockchain {

  constructor(blocks, io) {

    this.blocks = blocks || [new Block(0, 1, 0, [])];
    this.currentTransactions = [];
    this.nodes = [];

    this.io = io;

  }

  addNode(node) {
    this.nodes.push(node);
  }

  mineBlock(block) {
    this.blocks.push(block);

    console.log('Mined Successfully');

    this.io.emit(actions.END_MINING, this.toArray());
  }

  async newTransaction(transaction) {

    this.currentTransactions.push(transaction);

    if (this.currentTransactions.length === 2) {
      console.info('Starting mining block...');

      const previousBlock = this.lastBlock();

      process.env.BREAK = false;

      const block = new Block(previousBlock.getIndex() + 1, previousBlock.hashValue(), previousBlock.getProof(), this.currentTransactions);

      const { proof, dontMine } = await generateProof(previousBlock.getProof());
      block.setProof(proof);

      this.currentTransactions = [];

      if (dontMine !== 'true') {
        this.mineBlock(block);
      }
    }
  }

  lastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  getLength() {
    return this.blocks.length;
  }

  checkValidity() {
    const { blocks } = this;

    let previousBlock = blocks[0];

    for (let index = 1; index < blocks.length; index++) {
      const currentBlock = blocks[index];

      if (currentBlock.getPreviousBlockHash() !== previousBlock.hashValue()) {
        return false;
      }

      if (!isProofValid(previousBlock.getProof(), currentBlock.getProof())) {
        return false;
      }

      previousBlock = currentBlock;

    }
    return true;
  }

  /* Stringify and Parsing functions */
}

module.exports = Blockchain;


//
// The chain has 2 major components currentTransactions and blocks. 

// The currentTransactions contains a list of transactions that are yet to be mined to a block. 

// The blocks contain the list of all the blocks in the chain ordered according to the time they were mined. 

// The above chain also has the block size as 2 transactions.

// In the constructor we are setting the blocks to initially have a single block with index as 0, previousBlockHash as 1, and proof as 0. 

// This is also known as the initial block or the genesis block. 

// But we have a list of blocks passed to the chain as just the blocks with the value it received.

// The addNode() functions is responsible for connecting the current node with other nodes of the blockchain network. 

// The mineBlock() function adds the mined block to the chain and signals other blocks to end the mining.

// The most important methods are newTransaction() and checkValidity(). 

// The newTransaction() method is called when the node receives a transaction request. 

// We push the transaction to the currentTransactions pool. 

// If the size of the currentTransaction pool is 2 we start to mine the block. 

// We first get the latest block of the current chain. We create a block out of the latest block's hashValue, index and the 
// currentTransactions pool. 

// Then we generate the solution for the proof of work by passing the latest block's proof to generateProof() method. 

// Once the solution is arrived we set the newly created block's proof.
// We then reset the currentTransaction pool and check whether this block can be mined using dontMine flag.
// If it can be mined we go ahead to mine the block.

// The checkValidity() method checks the validity of the chain starting from the initial block. We get the currentBlock and previousBlock,
// we check whether the current block's previousHash to be same as previous block's hashValue. 

// If they don't match, we reject. We then check the validity of proof between the current and previous blocks.
// If they don't match either we reject the chain. We then check the currentBlock to be the previousBlock.
// We do this till the end of the chain and then return true if no discrepancies are found.

// The above mentioned verification of the blocks is what makes the blockchain impossible to break and alter. 
// If an attacker has to change the currentBlocks data he has to change the previousBlocks data as our hash calculation is based upon the data. 
// If the data changes, hash changes, and therefore he has to do this till the initial block. 

// Another secure aspect comes from the proof generation. 
// If the attacker changes and tampers with the block the proof solution changes so again the attacker has to generate proof all the way from
// initial to the tampered block which can take a huge amount of time as the calculation of proof isn't very simple and easy.
//

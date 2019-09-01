// Building your own blockchain in JavaScript
// createblock.js

//
// Creating the Blocks
//


// The Genesis Block

// The first block, known as the Genesis Block, will get handed zero as the previous hash, 
// so we’ll have to write a function to create that single block.


const createGenesisBlock = () => new Block(0, Date.now(), 'Genesis Block', '0');


// The Next Block

// Create a nextBlock function that takes only the last block, and the new block’s data as parameters.
// The function then creates a new block and sets the index of the new block to whatever the previous block’s index was and adds 1, 
// grabs the current time, and then grabs the previous block’s hash and sets it as prevHash on the new block. 


const nextBlock = (lastBlock, data) =>

  new Block(lastBlock.index + 1, Date.now(), data, lastBlock.thisHash);


//
// Let’s say someone wanted to alter the bitcoin blockchain so that it looked like they had received more bitcoin than they actually did,
// or to make it look like they spent less of their bitcoin. 
// If they altered a block, the hash, which serves as a snapshot of the data the block contained when it was created, would no longer match.

// To remedy this, they’d have to rehash the block.
// Since all the blocks are linked together and point back to the previous block’s hash, this person would also have to alter all the blocks
// on the chain following their target block in order to make it look legitimate.

// While modern computers could conceivably alter a block, generate new hash, and then generate new hashes for all the following blocks so that
// the altered block was seen as legitimate, bitcoin in particular implements a method called ‘Proof of Work’ to slow down the confirmation of new
// blocks, making it nearly impossible. 

// Also, due to the distributed network of ledgers that a blockchain relies on, a nefarious actor would have to control more than 50% of the network
// in order for their counterfeit blockchain to be accepted. 
//

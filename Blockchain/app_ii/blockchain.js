// Building your own blockchain in JavaScript
// blockchain.js

//
// Creating the Blockchain
//

//
// Let’s write a function that will run as many times as we want, adding new blocks, and then we’ll take a look at what it’s created.
//

// We create a new function that will create a new blockchain at any length you specify.


const createBlockchain = num => {

  // I create a new blockchain that we’ll store in an array.

  // I place the genesis block as the first element in the array. 

  const blockchain = [createGenesisBlock()];

  let previousBlock = blockchain[0];

  for (let i = 1; i < num; i += 1) {

    const blockToAdd = nextBlock(previousBlock, `This is block #${i}`);

    blockchain.push(blockToAdd);

    previousBlock = blockToAdd;

  }

  console.log(blockchain);

};

const lengthToCreate = 20;

createBlockchain(lengthToCreate);


//
// Next, I create each block, one at a time, handing it the data it requires from the previous block, and then I place that new block into
// our array. 
//


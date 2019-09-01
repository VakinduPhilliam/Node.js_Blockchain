// Building a Blockchain with Node.js
// testing.js

//
// Testing the blockchain
//

// Insert the values you’d like for the new Block parameters

// (Note that the parameters must be included in the order of index, timestamp, and data.)


let testChain = new Blockchain();

console.log("Mining block...");

testChain.addBlock(new Block(1, timestamp, "This is block 1"));

console.log("Mining block...");

testChain.addBlock(new Block(2, timestamp, "This is block 2"));

console.log(JSON.stringify(testChain, null, 4));

console.log("Is blockchain valid?" + testChain.checkValid().toString());



//
// cd into your project folder and run node blockchain.js. 
//

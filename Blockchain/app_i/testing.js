// Creating a blockchain with Node.js & JavaScript
// testing.js

//
// Testing the Blockchain's validity
//

// Log the validity of the blockchain without tampering any block. 


console.log("Validity: ", CILCoin.chainIsValid());

// In the first case it will be true

//
// Then tamper with one of the blocks by changing its data. 

CILCoin.chain[0].data.receiver = "Joker";

// Then log the validity again.

console.log("Validity: ", CILCoin.chainIsValid());


// In the second it will be false.


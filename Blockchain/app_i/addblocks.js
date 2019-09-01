// Creating a blockchain with Node.js & JavaScript
// addblocks.js

//
// Adding New Blocks to the Blockchain
//

// We are now done with building the blockchain. 
// Now we only have to add new blocks and test the blockchain's validity.

 
// So, outside both the classes, create an object of the BlockChain class and name it, for example CILCoin. 

// Then, add a few blocks to it using the addBlock function.


const CILCoin = new BlockChain();

// Add data into Block as JSON

CILCoin.addBlock({sender: "Thor of Asgard", receiver: "Thanos", amount: 1090});


CILCoin.addBlock({sender: "Sky Walker", receiver: "Jedi", amount: 450});


CILCoin.addBlock({sender: "The Penguin", receiver: "Dr. Steven Strange", amount: 35});


console.log(JSON.stringify(CILCoin, null, 4));

//
// Go to your console and run this using the command “node main.js”. 
// You should be getting an output like this:
//


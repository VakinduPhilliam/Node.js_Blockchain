// Creating a blockchain with Node.js & JavaScript
// blockchain.js

//
// Creating the Blockchain
//
// Now, let’s create a new class to represent the entire block chain. 
// This class will have a single attribute called “chain” which will hold an array of blocks.
//


class BlockChain {

    constructor() {

        this.chain = [];

    }


// Create a function in this class called addBlock. 

// This will be responsible for adding a new block to the chain and it will take the data as its argument. 

// Inside the function, calculate the index of the new block by getting the length of the existing chain. 

// Get the hash of the last block in the chain (if the chain is empty, use “0” by default). 

// Finally, create a new object of the “Block” class and plug in the calculated values in the constructor.
// Push this object into the “chain” array.


addBlock(data){

    let index = this.chain.length;
    let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;

    let block = new Block(index, data, prevHash);

    this.chain.push(block);

}



//
// Create another method in the same class and name it chainIsValid. 

// In this function, we will be checking if the blockchain is following all the rules. 

// It should have two checks as mentioned above. 

// One, the validity of the hash, which can be done by comparing the stored hash with a newly calculated hash.
// If they match, then the values haven’t been tampered with. 

// Then two, checking if the previousHash attribute is storing the same value as the hash of the previous block.
// This has to be performed on all the blocks in the chain.



chainIsValid() {

    for(var i=0;i<this.chain.length;i++){

        if(this.chain[i].hash !== this.chain[i].getHash()) 

            return false;

        if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)

            return false;

    }

    return true;

}


}


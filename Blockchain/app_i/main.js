// Creating a blockchain with Node.js & JavaScript
// main.js

//
// Creating the Block
//
// Let’s get to the code
// We will be building a simple cryptocurrency called “cilcoin”. 

// Let’s get started on building our very first blockchain.

// Create an empty directory anywhere on your computer.
// In that, create a new file called main.js.

//
// Create a class called “Block” which will represent a block in the chain. 
// Give it a constructor with arguments as index, data and previous hash. 

// Store the values of the arguments in consequent local variables. 
// Create another attribute called timestamp and store the actual timestamp in it.



class Block {

    constructor(index, data, prevHash) {

        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;

        this.prevHash = prevHash;
        this.hash = this.getHash();

    }

    // Create a function inside the class and name it getHash. 
    // We will be using the sha256 algorithm to generate the hash. 

    // So import the required files. 

    // Inside the function, calculate the hash by using the other attributes as salt.
    // Salts are basically just arbitary string values used for generating hashes.
    // Return the calculated hash. 

    // Also, create an attribute in the constructor and store the calculated value by calling our function.


    getHash(){

    return sha(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);

    }


}



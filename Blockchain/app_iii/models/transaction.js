// Blockchain using NodeJS and Socket.io
// transaction.js

//
// The Transaction Model
//

// This transaction model takes in data as sender, receiver, amount and in addition creates another internal data
// called timestamp.

class Transaction {

  constructor(sender, receiver, amount) {

    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;

    this.timestamp = Date.now();

  }

  /* Stringfying and Parser functions */ 

}

module.exports = Transaction;


// Blockchain using NodeJS and Socket.io
// socketListeners.js

//
// The Socket Listeners
//

// The server app merely acts a facade to the socket listeners and only facilitates the connections between nodes. 

//
// The socket listeners are responsible for triggering the events such as adding transactions to the blockchain, mining a new block
// and signaling successful mining status of a node to other nodes in the blockchain network.
//


const SocketActions = require('./constants');

const Transaction = require('./models/transaction');
const Blockchain = require('./models/chain');

const socketListeners = (socket, chain) => {

  socket.on(SocketActions.ADD_TRANSACTION, (sender, receiver, amount) => {

    const transaction = new Transaction(sender, receiver, amount);
    chain.newTransaction(transaction);

    console.info(`Added transaction: ${JSON.stringify(transaction.getDetails(), null, '\t')}`);

  });

  socket.on(SocketActions.END_MINING, (newChain) => {

    console.log('End Mining encountered');
    process.env.BREAK = true;

    const blockChain = new Blockchain();
    blockChain.parseChain(newChain);

    if (blockChain.checkValidity() && blockChain.getLength() >= chain.getLength()) {
      chain.blocks = blockChain.blocks;
    }

  });

  return socket;
};

module.exports = socketListeners;


//
// The socket listens to two events, ADD_TRANSACTION and END_MINING events, emitted by other nodes. 

// The ADD_TRANSACTION listener actively listens to an incoming transaction event triggered by any node on the network. 

// Adds it to the blockchain by calling the chain's newTransaction method.

// The END_MINING event is triggered when one of the nodes successfully mines the block. 

// It sets the BREAK flag to true which tells the other nodes on the network to stop mining and start verifying the solution. 

// We parse the stringified chain back to proper blockchain and call the checkValidity() method of the parsed chain. 

// We also check whether the length of the parsed chain is greater than the current chain's length. 

// If it is a success, we go ahead and replace it with the new chain; else, we just reject and hold on to our old chain.
//

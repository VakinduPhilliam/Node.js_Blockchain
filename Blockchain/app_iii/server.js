// Blockchain using NodeJS and Socket.io
// server.js

//
// The Server Application
//


// The Server App
// We have the model and generation setup all we need is a working server to orchestrate the action and interact
// with the blockchain.
//


// Import Node.js libraries

const app = require('express')();
const bodyParser = require('body-parser');
const httpServer = require('http').Server(app);
const axios = require('axios');

const io = require('socket.io')(httpServer);
const client = require('socket.io-client');

const BlockChain = require('./models/chain');
const SocketActions  = require('./constants');

const socketListeners = require('./socketListeners');

const { PORT } = process.env;

const blockChain = new BlockChain(null, io);



app.use(bodyParser.json());

app.post('/nodes', (req, res) => {

  const { host, port } = req.body;
  const { callback } = req.query;

  const node = `http://${host}:${port}`;
  const socketNode = socketListeners(client(node), blockChain);

  blockChain.addNode(socketNode, blockChain);

  if (callback === 'true') {
    console.info(`Added node ${node} back`);

    res.json({ status: 'Added node Back' }).end();

  } else {

    axios.post(`${node}/nodes?callback=true`, {
      host: req.hostname,
      port: PORT,

    });

    console.info(`Added node ${node}`);
    res.json({ status: 'Added node' }).end();

  }
});

app.post('/transaction', (req, res) => {
  const { sender, receiver, amount } = req.body;

  io.emit(SocketActions.ADD_TRANSACTION, sender, receiver, amount);

  res.json({ message: 'transaction success' }).end();

});

app.get('/chain', (req, res) => {
  res.json(blockChain.toArray()).end();
});

io.on('connection', (socket) => {
  console.info(`Socket connected, ID: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Socket disconnected, ID: ${socket.id}`);

  });
});

blockChain.addNode(socketListeners(client(`http://localhost:${PORT}`), blockChain));

httpServer.listen(PORT, () => console.info(`Express server running on ${PORT}...`));


//
// The server consists of an express and socket app that are bound to a http server running on a specific port.
// The /nodes endpoint allows us to connect to another node's socket app and sends the information for the other node to connect back. 

// We also bind socket listeners to the socket connections created.
// The /transaction endpoint receives a transaction request and broadcasts the transaction information to other nodes.
// The /chain endpoint lists the details of the blockchain. 

// There is also socket connection listener that actively logs the ID and monitors the connection status between nodes.
// Finally we make the server listen on a specific port.
//

// Blockchain using NodeJS and Socket.io
// proof.js

//
// The Proof of Work (POW)
//

// Proof of Work Generation and Verification


// Import Node.js cryptography library

const crypto = require('crypto');


const generateProof = (previousProof) => new Promise((resolve) => {

  setImmediate(async () => {

    let proof = Math.random() * 10000000001;

    const dontMine = process.env.BREAK;

    if (isProofValid(previousProof, proof) || dontMine === 'true') {

      resolve({ proof, dontMine });

    } else  {

      resolve(await generateProof(previousProof));

    }
  });
});

const isProofValid = (previousProof, currentProof) => {

  const difference = currentProof - previousProof;
  const proofString = `difference-${difference}`;
  const hashFunction = crypto.createHash('sha256');

  hashFunction.update(proofString);

  const hexString = hashFunction.digest('hex');

  if (hexString.includes('000000')) {
    return true;
  }

  return false;
};

exports.generateProof = generateProof;
exports.isProofValid = isProofValid;


//
// This is the most time-consuming and the crucial part in any blockchain mining. 

// Proof of Work is a solution for a problem that is harder to solve but easier to verify. 

// We have wrapped the generation algorithm inside a setImmediate function and wrapped it further under a Promise. 

// Okay now you must be wondering why wrapping it under setImmediate.
// The reason is I have an environment variable that signals the end of the mining process. 

// I set that variable to true if any other node in the network has finished mining a block. 

// If I wrap the generation algorithm in a while loop, it blocks the Event Loop and never checks the status of the environment variable until
// it has finished arriving at a solution. 

// setImmediate allows it to bypass that as it waits until current process has finished executing before generating for the next time. 

// This allows another module in my program to go and change the status of the environment variable. 

// It also allows me to bypass the call stack limit when calling a recursive function.

// Our proof of work problem is simple; the hash value of the difference between current and previous proofs must contain six consecutive zeroes.

// We start with a random number and multiply it by a huge number. Then we verify whether proof satisfies the condition and also we verify whether end of mining has been set. 

// If it satisfies we resolve the value, else we try again. We repeat this process till we get a proof.
//

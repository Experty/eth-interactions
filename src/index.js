let utils = require('./script.js')('privkey here!!!');

let addr = '0x00590d7fbc805b7882788d71afbe7ec2deaf03ca';

// for test network:
utils.setHttpProvider('https://kovan.infura.io/49cO6Bu58uaoA0tgS2Zi');
// for mainnet:
// utils.setHttpProvider('https://mainnet.infura.io/49cO6Bu58uaoA0tgS2Zi');

// check if address is whitelisted
utils.isWhitelisted(addr).then(done => {
  console.log(done);
});

// get whitelist address balance
utils.getWhitelistBalance().then(done => {
  console.log(done);
});

// whitelist specified address
utils.whitelist(addr)
.then(done => {
  console.log(done);
})
.catch(err => {
  console.error(err);
});

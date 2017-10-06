let utils = require('./script.js')('');

let addr = '0xBfD6F82d60BCBaB206ef673e07Ae07569ACC2b3b';

// for test network:
// utils.setHttpProvider('https://kovan.infura.io/49cO6Bu58uaoA0tgS2Zi');
// for mainnet:
// utils.setHttpProvider('https://mainnet.infura.io/49cO6Bu58uaoA0tgS2Zi');

// check if address is whitelisted
utils.isWhitelisted(addr).then(done => {
  console.log('whitelisted', done);
});

// get whitelist address balance
utils.getWhitelistBalance().then(done => {
  console.log(done);
});

// get contributions array
utils.getContributions(addr, {isFormatted: true}).then(contribs => {
  console.log(contribs);
});

// whitelist specified address
// utils.whitelist(addr)
// .then(done => {
//   console.log(done);
// })
// .catch(err => {
//   console.error(err);
// });

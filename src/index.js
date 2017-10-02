let utils = require('./script.js')('e22f30d80cf6939fb381103c620a06aaa4a6dddbcc6ec5ac5698bcaa7dcba3e4');

let addr = '0x34c62381028ce0da2ed8f0dc48b729593915f214';

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

// get contributions array
utils.getContributions(addr, {isFormatted: true}).then(contribs => {
  console.log(contribs);
});

// // whitelist specified address
// utils.whitelist(addr)
// .then(done => {
//   console.log(done);
// })
// .catch(err => {
//   console.error(err);
// });

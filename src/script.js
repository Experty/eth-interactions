
const Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const sequential = require('promise-sequential');

let WHITELIST_PRIVKEY = '';
const WHITELIST_ADDR = '0x71e2f5362fdf6A48ab726E1D3ef1Cd4B087436fC';
const CONTRACT_ADDRESS = '0x4d136e8e26c823e6ac0078fece014e9b701fdf1a';
const ABI = [{"constant":true,"inputs":[],"name":"managerAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"txIdx","type":"uint8"}],"name":"approveTx","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contributors","outputs":[{"name":"addr","type":"address"},{"name":"amount","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"rejected","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"destAddr","type":"address"}],"name":"proposeTx","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"whitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"idx","type":"uint256"}],"name":"reject","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"founders","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"txs","outputs":[{"name":"founder","type":"address"},{"name":"destAddr","type":"address"},{"name":"active","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];
const HTTP_PROVIDER = 'https://kovan.infura.io/49cO6Bu58uaoA0tgS2Zi';
// const HTTP_PROVIDER = 'http://localhost:8545';

// const HTTP_PROVIDER = 'https://mainnet.infura.io/49cO6Bu58uaoA0tgS2Zi';
// const WS_PROVIDER = 'ws://localhost:8546';

if (WHITELIST_PRIVKEY === '') {
  throw new Error('set WHITELIST_PRIVKEY first!');
}

let web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
let contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

module.exports.setWhitelistPrivkey = priv => WHITELIST_PRIVKEY = priv;

module.exports.getWhitelistBalance = function() {
  return web3.eth.getBalance(WHITELIST_ADDR).then(amount => {
    return scPrint(amount);
  });
};

module.exports.isWhitelisted = function(addr) {
  return contract.methods.isWhitelisted(addr).call();
};

module.exports.whitelist = function(addr) {
  let whitelist = contract.methods.whitelist(addr);
  let createTxPromise = Promise.all([
    web3.eth.getGasPrice(),
    web3.eth.getTransactionCount(WHITELIST_ADDR),
    whitelist.estimateGas()
  ])
  .then(res => {
    let [gasPrice, nonce, gasLimit] = res;

    let txData = {
      nonce: Web3.utils.toHex(nonce),
      to: CONTRACT_ADDRESS,
      data: whitelist.encodeABI(),
      value: Web3.utils.toHex(0),
      gas: Web3.utils.toHex(parseInt(gasLimit * 2)),
      gasPrice: Web3.utils.toHex(gasPrice)
    };

    let tx = new Tx(txData);
    tx.sign(new Buffer(WHITELIST_PRIVKEY, 'hex'));
    return '0x' + tx.serialize().toString('hex');
  });

  return sequential([
    () => createTxPromise,
    signedTx => web3.eth.sendSignedTransaction(signedTx).then(res => {
      return res.transactionHash;
    })
  ])
  .then(allRes => allRes.pop());
};

function scPrint(num) {
  let nozeros = num.replace(/0*$/, '');
  return `${nozeros}e${num.length-nozeros.length}`;
}

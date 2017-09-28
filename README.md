```
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
})
```

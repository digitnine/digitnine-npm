const api = require('./api');
const merchant = require('./lib/merchant');

api.key = "sp2";
api.secret = "password";
api.isProduction = false;

api.cacheToken = true;

//api.printMsg();

// api.getCurrentUserDetails().then(user => {
//     console.log(user);
//     return user;
// });

api.getWallets().then(wallets => {
    //console.log(wallets);
    return wallets;
});

api.getMerchantProfileById('7').then(response => {
    //console.log(response);
    return response;
})
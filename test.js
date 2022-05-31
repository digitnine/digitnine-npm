const api = require('./api');

api.key = "sp2";
api.secret = "password";
api.isProduction = false;

//api.printMsg();

api.getCurrentUserDetails().then(user => {
    console.log(user);
    return user;
});


api.getWallets().then(wallets => {
    console.log(wallets);
    return wallets;
});
const api = require('./api');
const merchant = require('./lib/merchant');

api.key = "sp2";
api.secret = "password";
api.isProduction = false;

api.cacheToken = true;

//api.printMsg();


// api.getListOfServiceProviders({ ctryCode:12, ccyCode: 2, sort: ['abc', 'abc'] }).then(response => {
//     //console.log(response);
//     return response;
// })
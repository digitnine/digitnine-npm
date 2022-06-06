const api = require('./api');
const merchant = require('./lib/merchant');

api.key = "sp2";
api.secret = "password";
api.isProduction = false;

api.cacheToken = true;

//api.printMsg();


api.getTheListOfServiceProviderWallets({
    page:0,size:20
    
}).then(response => {
    //console.log(response);
    return response;
})
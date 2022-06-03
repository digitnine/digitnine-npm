const api = require('./api');
const merchant = require('./lib/merchant');

api.key = "sp2";
api.secret = "password";
api.isProduction = false;

api.cacheToken = true;

//api.printMsg();


api.getListOfBeneficiary({ page: 1, size: 20,ids:[2],sort:['abc','wsc']}).then(response => {
    //console.log(response);
    return response;
})
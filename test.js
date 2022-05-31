const api = require('./api');


api.key = "sp2";
api.secret = "password"; 
api.isProduction = false ; 


api.printMsg();
 
api.getToken();

console.log(api.token);

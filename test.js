const api = require("./api");
const merchant = require("./lib/merchant");

api.key = "sp2";
api.secret = "password";
api.isProduction = false;

api.cacheToken = true;

//api.printMsg();


api.updateMerchantProfileCommentByID({
    merchantProfileID: 1,
    commentID: 2,
    content: {
        'content': 'string'
    }

}).then(response => {
    //console.log(response);
    return response;
})
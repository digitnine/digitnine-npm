
//staging  
const sandboxURLs = {
    'merchant': 'http://merchant-service-demo.digitnine.com',
    'idm': 'http://idm-service-demo.digitnine.com'
};

//production 
const productionURLs = {
    'merchant': 'http://merchant-service-dev.digitnine.com',
    'idm': 'http://idm-service.digitnine-dev.com'
};

module.exports = {
    isProduction: false,
    printMsg: function () {
        console.log("This is a message from the EntryPoint Lib");
    },
    getIDMServiceUrl: function () {
        return (this.isProduction ? productionURLs['idm'] : sandboxURLs['idm']);
    },
    getMerchantServiceUrl: function () {
        return (this.isProduction ? productionURLs['merchant'] : sandboxURLs['merchant']);
    }
};
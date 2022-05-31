
const axios = require('axios');
const base64 = require('nodejs-base64-converter');
const url = require('url');

const eps = require('./entrypoints');

module.exports = {
    serviceURL: "",
    authToken: "",
    isProduction: false,
    printMsg: function () {
        console.log("This is a message from the IDM Lib");
    },

    getWallets: function (pagination_data = null) {

        eps.isProduction = this.isProduction;

        const options = {
            'headers': {
                'Authorization': 'Bearer ' + this.authToken,
            }
        };

        // print_r($options);
        // exit ;

        const uri = "/v1/service-provider/wallets";

        if (pagination_data != null) {
            const pagination = {
                "size": pagination_data['size'],
                "page": pagination_data['page']
            };

            const params = new url.URLSearchParams(pagination);
        }

        return axios
            .get(eps.getMerchantServiceUrl() + uri, options)
            .then(res => {
                //console.log("statusCode :" + res.status);
                //console.log(res.data);
                return res.data;
            })
            .catch(error => {
                console.error(error.response.data);
            });
    }


};
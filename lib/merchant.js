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

    getWallets: async function (pagination_data = null) {

        eps.isProduction = this.isProduction;

        console.log(">>>>>>>>>>>>>", this.authToken)
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
                return res.data;
            })
            .catch(error => {
                console.error(error.response.data);
            });
    },

    getBeneficiaryId: async function (id) {

        try {
            const beneficiaryId = id.id;
            if (beneficiaryId !== null || beneficiaryId !== undefined) {
                eps.isProduction = this.isProduction;

                const url = eps.getMerchantServiceUrl() + `/v1/merchant-service/beneficiaries/${beneficiaryId}`
                console.log(url)
                const headers = {
                    'headers': {
                        'Authorization': 'Bearer ' + this.authToken,
                    }
                };

                const res = await axios.get(url, headers)
                if (res.statusCode === 200) {
                    console.log(res.data)

                } else {
                    console.log(console.log(error.response.data))
                }
            } else {
                throw new Error('Id requried');
            }
        } catch (e) {
            console.log(e.response.data);
        }

    }


};
const axios = require('axios');
const base64 = require('nodejs-base64-converter');
const { URLSearchParams } = require('url');
const eps = require('./entrypoints');

module.exports = {
    serviceURL: "",
    authToken: "",
    isProduction: false,
    printMsg: function () {
        console.log("This is a message from the IDM Lib");
    },

    //-----Merchant Services-----//

    //Merchant Service Wallet operations Apis----
    getWallets: async function (pagination_data = null) {
        try {
            eps.isProduction = this.isProduction;

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + this.authToken,
                }
            };
            const url = eps.getMerchantServiceUrl() + "/v1/service-provider/wallets";

            if (pagination_data != null) {
                const pagination = {
                    "size": pagination_data['size'],
                    "page": pagination_data['page']
                };

                const params = new URLSearchParams(pagination);
            }


            const res = await axios.get(url, headers)
                if (res.statusCode === 200) {
                    console.log(res.data)
                    return res.data
                } else {
                    console.error(res.data)
                }
        } catch (e) {
            console.log(e)
        }
    },


    //Merchant Service Beneficiary operations Apis--
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
                   console.error(res.data)
                }
            } else {
                throw new Error('Id requried');
            }
        } catch (e) {
            console.log(e.response.data);
        }

    },

    //Service Provider Merchant Profile operations Apis--
    getMerchantProfileById: async function (id) {

        try {
            const merchantProfileId = id;
            if (merchantProfileId !== null || merchantProfileId !== undefined) {
                eps.isProduction = this.isProduction;

                const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles/${merchantProfileId}`
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
                   console.error(res.data)
                }
            } else {
                throw new Error('Id requried');
            }
        } catch (e) {
            console.log(e.response.data);
        }

    },
    listMerchantProfiles: async function (params) {
        try {
            eps.isProduction = this.isProduction;

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + this.authToken,
                }
            };

            let url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles`;
                url += `?page=${params.page}&size=${params.size}`;
                if(params.merchantName!==null && params.merchantName!==undefined){
                    url += `&merchantName=${params.merchantName}`
                }
                if(params.sort!==null && params.sort!==undefined){
                    if(Array.isArray(params.sort)){
                        for(const item in params.sort){
                            url += `&sort=${params.sort[item]}`;
                        }
                    }
                    else{
                        url += `&sort=${params.sort}`;
                    }
                }

            console.log("-------------") 
            console.log(url) 

            const res = await axios.get(url, headers)
                if (res.statusCode === 200) {
                    console.log(res.data)
                    return res.data
                } else {
                    console.error(res.data)
                }
        } catch (e) {
            console.log(e.response.data)
        }
    },
    updateMerchantProfileById: async function (id,body) {

        try {
                eps.isProduction = this.isProduction;

                const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles/${id}`
                console.log(url)
                const headers = {
                    'headers': {
                        'Authorization': 'Bearer ' + this.authToken,
                    }
                };

                const res = await axios.patch(url, body, headers)
                if (res.statusCode === 200) {
                    console.log(res.data)

                } else {
                   console.error(res.data)
                }
        } catch (e) {
            console.log(e.response.data);
        }

    },

    //Service Provider Dto Api--
    listServiceProviders: async function (params) {
        try {
            eps.isProduction = this.isProduction;

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + this.authToken,
                }
            };

            let url = eps.getMerchantServiceUrl() + `/v1/merchant-service/service-providers`;
                url += `?page=${params.page}&size=${params.size}`;
                url += `&countryCode=${params.countryCode}&currencyCode=${params.currencyCode}`;
                
                if(params.sort!==null && params.sort!==undefined){
                    if(Array.isArray(params.sort)){
                        for(const item in params.sort){
                            url += `&sort=${params.sort[item]}`;
                        }
                    }
                    else{
                        url += `&sort=${params.sort}`;
                    }
                }

            console.log("-------------") 
            console.log(url) 

            const res = await axios.get(url, headers)
                if (res.statusCode === 200) {
                    console.log(res.data)
                    return res.data
                } else {
                    console.error(res.data)
                }
        } catch (e) {
            console.log(e.response.data)
        }
    },

    //BankBasic Dto Api--
    listBanksOfServiceProvider: async function (params) {
        try {
            eps.isProduction = this.isProduction;

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + this.authToken,
                }
            };

            let url = eps.getMerchantServiceUrl() + `/v1/merchant-service/service-providers/${params.serviceProviderId}/banks`;
                url += `?page=${params.page}&size=${params.size}`;
                url += `&countryCode=${params.countryCode}&currencyCode=${params.currencyCode}`;
                
                if(params.sort!==null && params.sort!==undefined){
                    if(Array.isArray(params.sort)){
                        for(const item in params.sort){
                            url += `&sort=${params.sort[item]}`;
                        }
                    }
                    else{
                        url += `&sort=${params.sort}`;
                    }
                }

            console.log("-------------") 
            console.log(url) 

            const res = await axios.get(url, headers)
                if (res.statusCode === 200) {
                    console.log(res.data)
                    return res.data
                } else {
                    console.error(res.data)
                }
        } catch (e) {
            console.log(e.response.data)
        }
    },

    //rate dto api--
    getCurrentRate: async function (params) {

        try {
            eps.isProduction = this.isProduction;

            let url = eps.getMerchantServiceUrl() + `/v1/rates`
            url += `?fromCurrency=${params.fromCurrency}&toCurrency=${params.toCurrency}`;
            url += `&amount=${params.amount}`;
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
                console.error(res.data)
            }
        } catch (e) {
            console.log(e.response.data);
        }

    },

    //Executive Documents api--
    listExecutiveDocuments: async function () {

        try {
            eps.isProduction = this.isProduction;

            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/executive-documents`
            
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
                console.error(res.data)
            }
        } catch (e) {
            console.log(e.response.data);
        }

    },

    //Fees dto api--
    listFees: async function () {

        try {
            eps.isProduction = this.isProduction;

            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/fees`
            
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
                console.error(res.data)
            }
        } catch (e) {
            console.log(e.response.data);
        }

    },

    //KYC dto api--
    listServiceProviderKYC: async function () {

        try {
            eps.isProduction = this.isProduction;

            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/kycs`
            
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
                console.error(res.data)
            }
        } catch (e) {
            console.log(e.response.data);
        }

    },

    //MSService Provider Dto Api--
    listMerchantWallets: async function (params) {
        try {
            eps.isProduction = this.isProduction;

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + this.authToken,
                }
            };

            let url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-service-wallets`;
                url += `?page=${params.page}&size=${params.size}`;
                if(params.merchantName!==null && params.merchantName!==undefined ){
                    url += `&merchantName=${params.merchantName}`;
                }
                if(params.sort!==null && params.sort!==undefined){
                    if(Array.isArray(params.sort)){
                        for(const item in params.sort){
                            url += `&sort=${params.sort[item]}`;
                        }
                    }
                    else{
                        url += `&sort=${params.sort}`;
                    }
                }

            console.log("-------------") 
            console.log(url) 

            const res = await axios.get(url, headers)
                if (res.statusCode === 200) {
                    console.log(res.data)
                    return res.data
                } else {
                    console.error(res.data)
                }
        } catch (e) {
            console.log(e.response.data)
        }
    },

    //Risk Scoring dto api--
    listRiskScoringAssesments: async function () {

        try {
            eps.isProduction = this.isProduction;

            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/risk-assessments`
            
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
                console.error(res.data)
            }
        } catch (e) {
            console.log(e.response.data);
        }

    },

};
const axios = require("axios");
const base64 = require("nodejs-base64-converter");
const url = require("url");
const eps = require("./entrypoints");

module.exports = {
    serviceURL: "",
    authToken: "",
    isProduction: false,
    printMsg: function () {
        console.log("This is a message from the IDM Lib");
    },

    //-----Merchant Services-----//


    //Merchant Service Beneficiary operations Apis--
    getListOfBeneficiary: async function (params) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            let url = eps.getMerchantServiceUrl() + "/v1/merchant-service/beneficiaries";
            url += `?page=${params.page}&size=${params.size}`;

            if (params.type !== null && params.type !== undefined) {
                url += `&type=${params.type}`;
            }
            if (params.displayName !== null && params.displayName !== undefined) {
                url += `&displayName=${params.displayName}`;
            }
            if (params.iban !== null && params.iban !== undefined) {
                url += `&iban=${params.iban}`;
            }
            if (params.status !== null && params.status !== undefined) {
                url += `&status=${params.status}`;
            }
            if (params.ids !== null && params.ids !== undefined) {
                for (let i = 0; i < params.ids.length; i++) {
                    url += `&ids=${params.ids[i]}`;
                }
            }
            if (params.sort !== null && params.sort !== undefined) {
                for (let i = 0; i < params.sort.length; i++) {
                    url += `&sort=${params.sort[i]}`;
                }
            }
            console.log(url);
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },
    getBeneficiaryById: async function (id) {
        try {
            const beneficiaryId = id;

            eps.isProduction = this.isProduction;
            const url = eps.getMerchantServiceUrl() + `/v1/merchant-service/beneficiaries/${beneficiaryId}`;
            console.log(url);
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const res = await axios.get(url, headers);
            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },

    createMerchantBenficiaries: async function (params) {
        try {
            let body = params;
            eps.isProduction = this.isProduction;
            const url =
                eps.getMerchantServiceUrl() + `/v1/merchant-service/beneficiaries`;
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const res = await axios.post(url, body, headers);
            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },

    //Merchant Service - Service Providers operations Apis--
    getListOfBanksByServiceProviderId: async function (params) {
        try {
            if (
                (params.serviceProviderId && params.ctryCode && params.ccyCode) !==
                null &&
                (params.serviceProviderId && params.ctryCode && params.ccyCode) !==
                undefined
            ) {
                const headers = {
                    headers: {
                        Authorization: "Bearer " + this.authToken,
                    },
                };
                let url = eps.getMerchantServiceUrl() + `/v1/merchant-service/service-providers/${params.serviceProviderId}/banks`;
                url += `?page=${params.page}&size=${params.size}`;
                url += `&countryCode=${params.ctryCode}&currencyCode=${params.ccyCode}`;

                if (params.sort !== null && params.sort !== undefined) {
                    for (let i = 0; i < params.sort.length; i++) {
                        url += `&sort=${params.sort[i]}`;
                    }
                }
                console.log(url);
                const res = await axios.get(url, headers);

                if (res.statusCode === 200) {
                    console.log(res.data);
                } else {
                    console.error(res.data);
                }
            } else {
                throw new Error("required field canot be empty");
            }
        } catch (e) {
            console.log(e.response.data);
        }
    },
    getListOfServiceProviders: async function (params) {
        try {

            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            let url = eps.getMerchantServiceUrl() + `/v1/merchant-service/service-providers`;
            url += `?page=${params.page}&size=${params.size}`;
            url += `&countryCode=${params.ctryCode}&currencyCode=${params.ccyCode}`;

            if (params.sort !== null && params.sort !== undefined) {
                for (let i = 0; i < params.sort.length; i++) {
                    url += `&sort=${params.sort[i]}`;
                }
            }
            console.log(url);
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e.response.data);
        }
    },

    //Merchant Service bank account operations
    createBankAccountOfMerchantServiceWallets: async function (params) {

        try {
            let body = params;
            eps.isProduction = this.isProduction;
            const url = eps.getMerchantServiceUrl() + `/v1/merchant-service/bank-accounts`;
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const res = await axios.post(url, body, headers);
            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider Wallet operations apis--
    getTheListOfServiceProviderWallets: async function (params) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            let url =
                eps.getMerchantServiceUrl() +
                `/v1/service-provider/wallets`;
            url += `?page=${params.page}&size=${params.size}`;

            if (params.sort !== null && params.sort !== undefined) {
                for (let i = 0; i < params.sort.length; i++) {
                    url += `&sort=${params.sort[i]}`;
                }
            }
            console.log(url);
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }

    },
    createWalletForServiceProvider: async function (params) {

        try {
            let body = params;
            eps.isProduction = this.isProduction;
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/wallets`;
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const res = await axios.post(url, body, headers);
            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },
    //Service Provider Credit Scoring Operations apis--
    getListOfServiceProviderCreditScoringAssessments: async function () {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/credit-assessments`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider Merchant Wallet operations
    getTheMerchantWallet: async function (id) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-service-wallets/${id}`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },
    getTheListOfMerchantWallets: async function (params) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            let url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-service-wallets`;
            url += `?page=${params.page}&size=${params.size}`;

            if (params.merchantName !== null && params.merchantName !== undefined) {
                url += `&merchantName=${params.merchantName}`
            }
            if (params.sort !== null && params.sort !== undefined) {
                for (let i = 0; i < params.sort.length; i++) {
                    url += `&sort=${params.sort[i]}`;
                }
            }
            console.log(url);
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }

    },
    updateMerchantwallet: async function (id) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-service-wallets/${id}`;
            const res = await axios.patch(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider Merchant Beneficiary
    getMerchantBeneficiaryById: async function (id) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-service-beneficiaries/${id}`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },
    getListOfMerchantBeneficiaries: async function (params) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-service-beneficiaries`;
            url += `?page=${params.page}&size=${params.size}`;
            if (params.type !== null && params.type !== undefined) {
                url += `&type=${params.type}`;
            }
            if (params.displayName !== null && params.displayName !== undefined) {
                url += `&displayName=${params.displayName}`;
            }
            if (params.iban !== null && params.iban !== undefined) {
                url += `&iban=${params.iban}`;
            }
            if (params.status !== null && params.status !== undefined) {
                url += `&status=${params.status}`;
            }
            if (params.ids !== null && params.ids !== undefined) {
                for (let i = 0; i < params.ids.length; i++) {
                    url += `&ids=${params.ids[i]}`;
                }
            }
            if (params.sort !== null && params.sort !== undefined) {
                for (let i = 0; i < params.sort.length; i++) {
                    url += `&sort=${params.sort[i]}`;
                }
            }
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },

    //Rates operations
    getCurrentRate: async function (params) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/rates`;
            url += `?fromCurrency =${params.fromCurrency}&toCurrency=${params.toCurrency}`;
            if (params.amount !== null && params.amount !== undefined) {
                url += `&amount=${params.amount}`;
            }
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider Bank Account operations
    createBankAcctForServiceProvider: async function (params) {
        try {
            let body = params;
            eps.isProduction = this.isProduction;
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/wallets`;
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const res = await axios.post(url, body, headers);
            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },

    //Merchant Service Wallet
    getListOfMerchanWallets: async function (params) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/merchant-service/wallets`;
            url += `?page=${params.page}&size=${params.size}`;
            if (params.query !== null && params.query !== undefined) {
                url += `&query=${params.query}`;
            }
            if (params.merchantId !== null && params.merchantId !== undefined) {
                url += `&merchantId=${params.merchantId}`;
            }
            if (params.serviceProviderId !== null && params.serviceProviderId !== undefined) {
                url += `&serviceProviderId=${params.serviceProviderId}`;
            }
            if (params.status !== null && params.status !== undefined) {
                url += `&status=${params.status}`;
            }
            if (params.bankAccountId !== null && params.bankAccountId !== undefined) {
                url += `&bankAccountId=${params.bankAccountId}`;
            }
            if (params.currencyCode !== null && params.currencyCode !== undefined) {
                url += `&currencyCode=${params.currencyCode}`;
            }
            if (params.countryCode !== null && params.countryCode !== undefined) {
                url += `&countryCode=${params.countryCode}`;
            }
            if (params.bankCode !== null && params.bankCode !== undefined) {
                url += `&bankCode=${params.bankCode}`;
            }
            if (params.sort !== null && params.sort !== undefined) {
                for (let i = 0; i < params.sort.length; i++) {
                    url += `&sort=${params.sort[i]}`;
                }
            }
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },
    getMerchantWalletById: async function (id) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/merchant-service/wallets/${id}`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },
    createMerchantWallets: async function (params) {
        try {
            let body = params;
            eps.isProduction = this.isProduction;
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/wallets`;
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const res = await axios.post(url, body, headers);
            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider Merchant Profile documents operations
    getListOfDocsCurrentMerchantProfile: async function (merchantProfileID) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles/${merchantProfileID}/documents`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },
    createMechantProfileDoc: async function (params) {
        try {
            let body = params
            let merchantProfileID = params.merchantProfileID;
            delete body.merchantProfileID;
            console.log(body)
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles/${merchantProfileID}/documents`;
            const res = await axios.post(url, body, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider Executive Documents operations
    getListOFServiceProviderExecutiveDocs: async function () {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/executive-documents`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider Risk Scoring
    getListOFServiceProviderRiskScoringAssesments: async function () {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/risk-assessments`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider - Merchant Profile comments
    deleteMerchantProfileById: async function (params) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles/${params.merchantProfileID}/comments/${params.commentID}`;
            const res = await axios.delete(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },
    getListOfCommentsCurrentMerchantProfile: async function (merchantProfileID) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles/${merchantProfileID}/comments`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },
    updateMerchantProfileCommentByID: async function (params) {
        try {
            body = params.content
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles/${params.merchantProfileID}/comments/${params.commentID}`;
            const res = await axios.patch(url, body, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },
    createMerchantProfileComment: async function (params) {
        try {
            let body = params
            let merchantProfileID = params.merchantProfileID;
            delete body.merchantProfileID;
            console.log(body)
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/merchant-profiles/${merchantProfileID}/comments`;
            const res = await axios.post(url, body, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider KYC operations
    getListOfServiceProviderKYCs: async function () {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/kycs`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
        }
    },

    //Service Provider Fee
    getListOfFeesOfServiceProvider: async function () {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + `/v1/service-provider/fees`;
            const res = await axios.get(url, headers);

            if (res.statusCode === 200) {
                console.log(res.data);
            } else {
                console.error(res.data);
            }

        } catch (e) {
            console.log(e);
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
    listMerchantProfilesOfCurrentServiceProvider: async function (params) {
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
    getListServiceProviders: async function (params) {
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

    //Executive Documents Dto--
    getListServiceProviderExecutiveDocuments: async function () {

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
    getListFeesOfServiceProvider: async function () {

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

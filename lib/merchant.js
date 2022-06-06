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
    getBeneficiaryId: async function (id) {
        try {
            const beneficiaryId = id;
            if (beneficiaryId !== null && beneficiaryId !== undefined) {
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
            } else {
                throw new Error("Id requried");
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
            if (
                (params.ctryCode && params.ccyCode) !== null &&
                (params.ctryCode && params.ccyCode) !== undefined
            ) {
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
            } else {
                throw new Error("required field canot be empty");
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


};

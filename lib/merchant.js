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

    //Merchant Service Wallet operations Apis----
    getWallets: async function (pagination_data = null) {
        try {
            eps.isProduction = this.isProduction;

            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            const url = eps.getMerchantServiceUrl() + "/v1/service-provider/wallets";

            if (pagination_data != null) {
                const pagination = {
                    size: pagination_data["size"],
                    page: pagination_data["page"],
                };

                const params = new url.URLSearchParams(pagination);
                console.log(params);
            }
            const res = await axios.get(url, headers);
            if (res.statusCode === 200) {
                console.log(res.data);
                return res.data;
            } else {
                console.log(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },

    //Merchant Service Beneficiary operations Apis--
    getListOfBeneficiary: async function (params) {
        try {
            const headers = {
                headers: {
                    Authorization: "Bearer " + this.authToken,
                },
            };
            let url =
                eps.getMerchantServiceUrl() + "/v1/merchant-service/beneficiaries";
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
            }
            else {

                console.error(res.data);
            }

        } catch (e) {
            console.log(e.response.data);
        }
    },
    getBeneficiaryId: async function (id) {
        try {
            const beneficiaryId = id;
            if (beneficiaryId !== null && beneficiaryId !== undefined) {
                eps.isProduction = this.isProduction;

                const url =
                    eps.getMerchantServiceUrl() +
                    `/v1/merchant-service/beneficiaries/${beneficiaryId}`;
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
};

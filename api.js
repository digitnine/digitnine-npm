if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./node_modules/@digitnine/digitnine/tmp');
}

const eps = require('./lib/entrypoints');
const idm = require('./lib/idm');
const merchant = require('./lib/merchant');

const VERSION = '1.0.0';

module.exports = {

    appsDetails: { 'ver': VERSION },
    key: '',
    secret: '',
    token: '',
    cacheToken: false,
    isProduction: false,

    printMsg: function () {
        console.log("This is a message from the Digit9 API package");
        eps.printMsg();
        idm.printMsg();
        merchant.printMsg();

        console.log(eps.isProduction);
        console.log(eps.getIDMServiceUrl());
        console.log(eps.getMerchantServiceUrl());

        eps.isProduction = this.isProduction;
        console.log(eps.isProduction);
        console.log(eps.getIDMServiceUrl());
        console.log(eps.getMerchantServiceUrl());
    },

    getToken: async function () {
        data = { 'username': this.key, 'password': this.secret }
        this.token = localStorage.getItem('token');

        if (this.token != '' && this.token != undefined) {
            console.log("Catched: ", this.token);
            return this.token;
        } else {
            this.token = await idm.getToken(data)
            console.log("Fetched: ", this.token);
            if (this.cacheToken) {
                localStorage.setItem('token', this.token);
            }
            return this.token;

            ;
        }
    },

    getCurrentUserDetails: async function () {
        await this.getToken();
        if (this.token !== null) {
            idm.authToken = this.token;
            return idm.getCurrentUserDetails()
        } else {
            throw new Error('No token');
        }
    },

    //-----Merchant Services-----//

    //Merchant Service Wallet operations Apis----
    getWallets: async function (pagination_data = null) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.getWallets();
        } else {
            throw new Error('No token');
        }
    },

    //Merchant Service Beneficiary operations Apis---
    getBeneficiaryById: async function (id) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.getBeneficiaryId(id)
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Merchant Profile operations Apis--
    getMerchantProfileById: async function (id) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.getMerchantProfileById(id)
        } else {
            throw new Error('No token');
        }
    },
    //List Merchant profile under current service provider--
    listMerchantProfiles: async function ({page = 0,size=20,merchantName,sort=[]}) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.listMerchantProfiles({page,size,merchantName,sort});
        } else {
            throw new Error('No token');
        }
    },
    //Update Merchant Profile operations Apis--
    updateMerchantProfileById: async function (id ,body) {
        if(id!==null && id!==undefined){
            if(body!==null && body!==undefined){
                await this.getToken();
                if (this.token !== null) {
                    merchant.authToken = this.token;

                    return merchant.updateMerchantProfileById(id,body)
                } else {
                    throw new Error('No token');
                }
            }
            else{
                throw new Error('body is required');
            }
        }
        else{
            throw new Error('id is required');
        }
    },

    //List service provider--
    listServiceProviders: async function ({countryCode, currencyCode, page=0, size=20, sort=[]}) {
        if(countryCode!==null && countryCode!==undefined && countryCode!==""){
            if(currencyCode!==null && currencyCode!==undefined && currencyCode!==""){
                await this.getToken();
                if (this.token !== null) {
                    merchant.authToken = this.token;

                    return merchant.listServiceProviders({countryCode,currencyCode,page,size,sort});
                } else {
                    throw new Error('No token');
                }
            }
            else{
                throw new Error('currencyCode is required');
            }
        }else{
            throw new Error('countryCode is required');
        }
    },

    //List of banks associated to a service provider id--
    listBanksOfServiceProvider: async function ({serviceProviderId, countryCode, currencyCode, page=0, size=20, sort=[]}) {
        if(serviceProviderId!==null && serviceProviderId!==undefined && serviceProviderId!==""){
            if(countryCode!==null && countryCode!==undefined && countryCode!==""){
                if(currencyCode!==null && currencyCode!==undefined && currencyCode!==""){
                    await this.getToken();
                    if (this.token !== null) {
                        merchant.authToken = this.token;

                        return merchant.listBanksOfServiceProvider({serviceProviderId,countryCode,currencyCode,page,size,sort});
                    } else {
                        throw new Error('No token');
                    }
                }
                else{
                    throw new Error('currencyCode is required');
                }
            }else{
                throw new Error('countryCode is required');
            }
        }
        else{
            throw new Error('serviceProviderId is required');
        }
    },

    //get cureent rate dto--
    getCurrentRate: async function ({fromCurrency, toCurrency, amount=1}) {
        if(fromCurrency!==null && fromCurrency!==undefined && fromCurrency!==""){
            if(toCurrency!==null && toCurrency!==undefined && toCurrency!==""){
                await this.getToken();
                if (this.token !== null) {
                    merchant.authToken = this.token;

                    return merchant.getCurrentRate({fromCurrency,toCurrency,amount});
                } else {
                    throw new Error('No token');
                }
            }
            else{
                throw new Error('toCurrency is required');
            }
        }else{
            throw new Error('fromCurrency is required');
        }
    },

    //list executive documents dto--
    listExecutiveDocuments: async function () {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.listExecutiveDocuments();
        } else {
            throw new Error('No token');
        } 
    },

    //list fees dto of service provider--
    listFees: async function () {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.listFees();
        } else {
            throw new Error('No token');
        } 
    },

    //list KYC dto of service provider--
    listServiceProviderKYC: async function () {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.listServiceProviderKYC();
        } else {
            throw new Error('No token');
        } 
    },

    //list merchant wallets dto--
    listMerchantWallets: async function ({merchantName,page,size,sort=[]}) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.listMerchantWallets({merchantName,page,size,sort});
        } else {
            throw new Error('No token');
        } 
    },

    //list service provider risk scoring assesments--
    listRiskScoringAssesments: async function () {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.listRiskScoringAssesments();
        } else {
            throw new Error('No token');
        } 
    },

};
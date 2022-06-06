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

    //Merchant Service Beneficiary operations Apis---
    getListOfBeneficiary: async function ({
        page = 0,
        size = 20,
        type,
        displayName,
        iban,
        status,
        ids = [],
        sort = [] }) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOfBeneficiary({
                page,
                size,
                type,
                displayName,
                iban,
                status,
                ids,
                sort
            })
        } else {
            throw new Error('No token');
        }
    },
    getBeneficiaryById: async function (id) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.getBeneficiaryId(id)
        } else {
            throw new Error('No token');
        }
    },
    createMerchantBenficiaries: async function ({ type,
        accountTypeCode,
        companyName,
        firstName,
        middleName,
        lastName,
        residentCountryCode,
        bankInfo = {
            branchCode, iban,
            bic, accountHolderName,
            accountCountryCode, accountCurrencyCode
        } }) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.createMerchantBenficiaries({
                type, accountTypeCode,
                companyName, firstName,
                middleName, lastName,
                residentCountryCode, bankInfo
            })
        } else {
            throw new Error('No token');
        }
    },


    //Merchant Service - Service Providers operations Apis--
    getListOfBanksByServiceProviderId: async function ({
        serviceProviderId,
        ctryCode,
        ccyCode,
        page = 0,
        size = 20,
        sort = [] }) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOfBanksByServiceProviderId({
                serviceProviderId,
                ctryCode,
                ccyCode,
                page,
                size,
                sort
            })
        } else {
            throw new Error('No token');
        }
    },
    getListOfServiceProviders: async function ({ ctryCode, ccyCode, page = 0, size = 20, sort = [] }) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOfServiceProviders({
                ctryCode,
                ccyCode,
                page,
                size,
                sort
            })
        } else {
            throw new Error('No token');
        }
    },

    //Merchant Service bank account operations
    createBankAccountOfMerchantServiceWallets: async function ({
        accountHolderName,
        bic,
        iban,
        swift,
        bankAddress,
        bankCountryCode,
    }) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.createBankAccountOfMerchantServiceWallets(
                {
                    accountHolderName,
                    bic,
                    iban,
                    swift,
                    bankAddress,
                    bankCountryCode,

                })
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Wallet operations
    getTheListOfServiceProviderWallets: async function ({ page = 0, size = 20, sort = [] }) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getTheListOfServiceProviderWallets({
                page,
                size,
                sort
            })
        } else {
            throw new Error('No token');
        }

    },

    createWalletForServiceProvider: async function ({
        currencyCode,
        countryCode,
        bankCode,
        bankAccountId,
        description,
    }) {
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.createWalletForServiceProvider(
                {
                    currencyCode,
                    countryCode,
                    bankCode,
                    bankAccountId,
                    description,
                })
        } else {
            throw new Error('No token');
        }
    }


};
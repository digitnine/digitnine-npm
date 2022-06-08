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
        if (id !== null && id !== undefined) {
            await this.getToken();
            if (this.token !== null) {
                merchant.authToken = this.token;

                return merchant.getBeneficiaryById(id)
            } else {
                throw new Error('No token');
            }
        } else {
            throw new Error("Id requried");
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
        if (
            (serviceProviderId && ctryCode && ccyCode) !==
            null &&
            (serviceProviderId && ctryCode && ccyCode) !==
            undefined
        ) {
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
        } else {
            throw new Error("required field canot be empty");
        }
    },
    getListOfServiceProviders: async function ({ ctryCode, ccyCode, page = 0, size = 20, sort = [] }) {
        if (
            (ctryCode && ccyCode) !== null &&
            (ctryCode && ccyCode) !== undefined
        ) {
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
            }
            else {
                throw new Error('No token');
            }
        }
        else {
            throw new Error("required field canot be empty");
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
    },

    //Service Provider Credit Scoring Operations apis--
    getListOfServiceProviderCreditScoringAssessments: async function () {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOfServiceProviderCreditScoringAssessments()
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Merchant Wallet operations
    getTheMerchantWallet: async function (id) {
        if (this.token !== null) {
            if (id !== null && id !== undefined) {
                merchant.authToken = this.token;
                return merchant.getTheMerchantWallet(id)
            } else {
                throw new Error('Id is required')
            }
        } else {
            throw new Error('No token');
        }
    },
    getTheListOfMerchantWallets: async function ({ page = 0, size = 20, merchantName, sort = [] }) {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getTheListOfMerchantWallets({ page, size, merchantName, sort })
        } else {
            throw new Error('No token');
        }
    },
    updateMerchantwallet: async function (id) {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.updateMerchantwallet(id)
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Merchant Beneficiary
    getMerchantBeneficiaryById: async function (id) {
        if (this.token !== null) {
            if (id !== null && id !== undefined) {
                merchant.authToken = this.token;
                return merchant.getMerchantBeneficiaryById(id)
            } else {
                throw new Error('Id is required')
            }
        } else {
            throw new Error('No token');
        }
    },
    getListOfMerchantBeneficiaries: async function ({
        page = 0,
        size = 20,
        type,
        displayName,
        iban,
        status,
        ids,
        sort
    }) {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOfMerchantBeneficiaries({
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

    //Rates operations
    getCurrentRate: async function ({
        fromCurrency,
        toCurrency,
        amount }) {
        if (this.token !== null) {
            if ((fromCurrency && toCurrency !== null) && (fromCurrency && toCurrency !== undefined)) {
                merchant.authToken = this.token;
                return merchant.getCurrentRate({
                    fromCurrency,
                    toCurrency,
                    amount
                })
            } else {
                throw new Error('Required fields canot be empty')
            }
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Bank Account operations
    createBankAcctForServiceProvider: async function ({
        accountHolderName,
        bic,
        iban,
        swift,
        bankAddress,
        bankCountryCode

    }) {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.createBankAcctForServiceProvider({
                accountHolderName,
                bic,
                iban,
                swift,
                bankAddress,
                bankCountryCode
            })
        } else {
            throw new Error('No token');
        }
    },

    //Merchant Service Wallet
    getListOfMerchanWallets: async function ({
        page = 0,
        size = 20,
        query,
        merchantId,
        serviceProviderId,
        status,
        bankAccountId,
        currencyCode,
        countryCode,
        bankCode,
        sort = []
    }) {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOfMerchanWallets({
                page,
                size,
                query,
                merchantId,
                serviceProviderId,
                status,
                bankAccountId,
                currencyCode,
                countryCode,
                bankCode,
                sort
            })
        } else {
            throw new Error('No token');
        }
    },
    getMerchantWalletById: async function (id) {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getMerchantWalletById(id)
        } else {
            throw new Error('No token');
        }
    },
    createMerchantWallets: async function ({
        walletId,
        alias,
        countryCode,
        currencyCode,
        bankCode,
        serviceProviderId,
        bankAccountId
    }) {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.createMerchantWallets({
                walletId,
                alias,
                countryCode,
                currencyCode,
                bankCode,
                serviceProviderId,
                bankAccountId
            })
        } else {
            throw new Error('No token');
        }
    },


    //Service Provider - Merchant Profile comments
    deleteMerchantProfileById: async function ({ merchantProfileID, commentID }) {
        if (this.token !== null) {
            if ((merchantProfileID !== null && commentID !== null) && (merchantProfileID !== undefined && commentID !== undefined)) {
                merchant.authToken = this.token;
                return merchant.deleteMerchantProfileById({
                    merchantProfileID,
                    commentID
                })
            } else {
                throw new Error('Required fields are empty')
            }
        } else {
            throw new Error('No token');
        }
    },
    getListOfCommentsCurrentMerchantProfile: async function (merchantProfileID) {
        if (this.token !== null) {
            if (merchantProfileID !== null && merchantProfileID !== undefined) {
                merchant.authToken = this.token;
                return merchant.getListOfCommentsCurrentMerchantProfile(merchantProfileID)
            } else {
                throw new Error('merchantProfileID is required')
            }
        } else {
            throw new Error('No token');
        }
    },
    updateMerchantProfileCommentByID: async function ({ merchantProfileID, commentID, content = {} }) {
        if (this.token !== null) {
            if ((merchantProfileID !== null && commentID !== null) && (merchantProfileID !== undefined && commentID !== undefined)) {
                merchant.authToken = this.token;
                return merchant.updateMerchantProfileCommentByID({
                    merchantProfileID,
                    commentID,
                    content
                })
            } else {
                throw new Error('Required fields are empty')
            }
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Merchant Profile documents operations
    getListOfDocsCurrentMerchantProfile: async function (merchantProfileID) {
        if (this.token !== null) {
            if (merchantProfileID !== null && merchantProfileID !== undefined) {
                merchant.authToken = this.token;
                return merchant.getListOfDocsCurrentMerchantProfile(merchantProfileID)
            } else {
                throw new Error('merchantProfileID is required')
            }
        } else {
            throw new Error('No token');
        }
    },
    createMechantProfileDoc: async function ({
        merchantProfileID,
        checkType,
        checkId,
        fileName
    }) {
        if (this.token !== null) {
            if (merchantProfileID !== null && merchantProfileID !== undefined) {
                merchant.authToken = this.token;
                return merchant.createMechantProfileDoc({
                    merchantProfileID,
                    checkType,
                    checkId,
                    fileName
                })
            } else {
                throw new Error('merchantProfileID is required')
            }
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Executive Documents operations
    getListOFServiceProviderExecutiveDocs: async function () {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOFServiceProviderExecutiveDocs()

        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Risk Scoring
    getListOFServiceProviderRiskScoringAssesments: async function () {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOFServiceProviderRiskScoringAssesments()
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider - Merchant Profile comments
    deleteMerchantProfileById: async function ({ merchantProfileID, commentID }) {
        if (this.token !== null) {
            if ((merchantProfileID !== null && commentID !== null) && (merchantProfileID !== undefined && commentID !== undefined)) {
                merchant.authToken = this.token;
                return merchant.deleteMerchantProfileById({
                    merchantProfileID,
                    commentID
                })
            } else {
                throw new Error('Required fields are empty')
            }
        } else {
            throw new Error('No token');
        }
    },
    getListOfCommentsCurrentMerchantProfile: async function (merchantProfileID) {
        if (this.token !== null) {
            if (merchantProfileID !== null && merchantProfileID !== undefined) {
                merchant.authToken = this.token;
                return merchant.getListOfCommentsCurrentMerchantProfile(merchantProfileID)
            } else {
                throw new Error('merchantProfileID is required')
            }
        } else {
            throw new Error('No token');
        }
    },
    updateMerchantProfileCommentByID: async function ({ merchantProfileID, commentID, content = {} }) {
        if (this.token !== null) {
            if ((merchantProfileID !== null && commentID !== null) && (merchantProfileID !== undefined && commentID !== undefined)) {
                merchant.authToken = this.token;
                return merchant.updateMerchantProfileCommentByID({
                    merchantProfileID,
                    commentID,
                    content
                })
            } else {
                throw new Error('Required fields are empty')
            }
        } else {
            throw new Error('No token');
        }
    },
    createMerchantProfileComment: async function ({
        merchantProfileID,
        checkType,
        checkId,
        fileName }) {
        if (this.token !== null) {
            if (merchantProfileID !== null && merchantProfileID !== undefined) {
                merchant.authToken = this.token;
                return merchant.createMerchantProfileComment({
                    merchantProfileID,
                    checkType,
                    checkId,
                    fileName
                })
            } else {
                throw new Error('merchantProfileID is required')
            }
        } else {
            throw new Error('No token');
        }
    },

    //Service Provider KYC operations
    getListOfServiceProviderKYCs: async function () {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOfServiceProviderKYCs()

        } else {
            throw new Error('No token');
        }
    },

    //Service Provider Fee
    getListOfFeesOfServiceProvider: async function () {
        if (this.token !== null) {
            merchant.authToken = this.token;
            return merchant.getListOfFeesOfServiceProvider()

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
    listMerchantProfiles: async function ({ page = 0, size = 20, merchantName, sort = [] }) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.listMerchantProfilesOfCurrentServiceProvider({ page, size, merchantName, sort });
        } else {
            throw new Error('No token');
        }
    },
    //Update Merchant Profile operations Apis--
    updateMerchantProfileById: async function (id, body) {
        if (id !== null && id !== undefined) {
            if (body !== null && body !== undefined) {
                await this.getToken();
                if (this.token !== null) {
                    merchant.authToken = this.token;

                    return merchant.updateMerchantProfileById(id, body)
                } else {
                    throw new Error('No token');
                }
            }
            else {
                throw new Error('body is required');
            }
        }
        else {
            throw new Error('id is required');
        }
    },

    //List service provider--
    listServiceProviders: async function ({ countryCode, currencyCode, page = 0, size = 20, sort = [] }) {
        if (countryCode !== null && countryCode !== undefined && countryCode !== "") {
            if (currencyCode !== null && currencyCode !== undefined && currencyCode !== "") {
                await this.getToken();
                if (this.token !== null) {
                    merchant.authToken = this.token;

                    return merchant.getListServiceProviders({ countryCode, currencyCode, page, size, sort });
                } else {
                    throw new Error('No token');
                }
            }
            else {
                throw new Error('currencyCode is required');
            }
        } else {
            throw new Error('countryCode is required');
        }
    },

    //BankBasic Dto Api--
    listBanksOfServiceProvider: async function ({ serviceProviderId, countryCode, currencyCode, page = 0, size = 20, sort = [] }) {
        if (serviceProviderId !== null && serviceProviderId !== undefined && serviceProviderId !== "") {
            if (countryCode !== null && countryCode !== undefined && countryCode !== "") {
                if (currencyCode !== null && currencyCode !== undefined && currencyCode !== "") {
                    await this.getToken();
                    if (this.token !== null) {
                        merchant.authToken = this.token;

                        return merchant.listBanksOfServiceProvider({ serviceProviderId, countryCode, currencyCode, page, size, sort });
                    } else {
                        throw new Error('No token');
                    }
                }
                else {
                    throw new Error('currencyCode is required');
                }
            } else {
                throw new Error('countryCode is required');
            }
        }
        else {
            throw new Error('serviceProviderId is required');
        }
    },

    //get cureent rate dto--
    getCurrentRate: async function ({ fromCurrency, toCurrency, amount = 1 }) {
        if (fromCurrency !== null && fromCurrency !== undefined && fromCurrency !== "") {
            if (toCurrency !== null && toCurrency !== undefined && toCurrency !== "") {
                await this.getToken();
                if (this.token !== null) {
                    merchant.authToken = this.token;

                    return merchant.getCurrentRate({ fromCurrency, toCurrency, amount });
                } else {
                    throw new Error('No token');
                }
            }
            else {
                throw new Error('toCurrency is required');
            }
        } else {
            throw new Error('fromCurrency is required');
        }
    },

    //list executive documents dto--
    getListServiceProviderExecutiveDocuments: async function () {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.getListServiceProviderExecutiveDocuments();
        } else {
            throw new Error('No token');
        }
    },

    //list fees dto of service provider--
    getListFeesOfServiceProvider: async function () {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.getListFeesOfServiceProvider();
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
    listMerchantWallets: async function ({ merchantName, page, size, sort = [] }) {
        await this.getToken();
        if (this.token !== null) {
            merchant.authToken = this.token;

            return merchant.listMerchantWallets({ merchantName, page, size, sort });
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
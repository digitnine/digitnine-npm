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
      console.log("Catched: ",this.token);
      return this.token;
    } else {
      return await idm.getToken(data).then(token => {
        this.token = token;
        console.log("Fetched: ",this.token);
        if(this.cacheToken){
          localStorage.setItem('token', this.token);
        }
        return this.token;

      });
    }
  },

  getCurrentUserDetails: async function () {

    return await this.getToken().then(
      () => {
        idm.authToken = this.token;
        return idm.getCurrentUserDetails();
      }
    );

  },
  getWallets: async function (pagination_data = null) {
    return await this.getToken().then(
      () => {
        merchant.authToken = this.token;
        return merchant.getWallets();
      }
    );

  },

};
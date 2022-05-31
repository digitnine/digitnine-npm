
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
  getToken: async function (data) {

    eps.isProduction = this.isProduction;

    const uri = "/oauth/token";
    const options = {
      'headers': {
        'Authorization': 'Basic bWVyY2hhbnRQb3J0YWw6cGFzc3dvcmQ= ' //  . base64.encode("merchantPortal:password"),
      }
    };

    // print_r($options);
    // exit ;

    const credentials = {
      "grant_type": "password",
      "username": data['username'],
      "password": data['password']
    };


    const params = new url.URLSearchParams(credentials);
    try {
      const res = await axios.post(eps.getIDMServiceUrl() + uri, params.toString(), options)
      if (res.status === 200) {
        return res.data.access_token
      }
    } catch (error) {
      console.error(error);
    };
  },

  getCurrentUserDetails: function () {

    eps.isProduction = this.isProduction;

    const options = {
      'headers': {
        'Authorization': 'Bearer '+this.authToken,
      }
    };

    // print_r($options);
    // exit ;

    const uri = "/users/me";

    return axios
      .get(eps.getIDMServiceUrl() + uri, options)
      .then(res => {
        //console.log("statusCode :" + res.status);
        //console.log(res.data);
        return res.data;
       })
      .catch(error => {
        console.error(error);
      });
  }


};
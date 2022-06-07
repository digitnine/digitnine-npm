const api = require("./api");
const merchant = require("./lib/merchant");

api.key = "sp2";
api.secret = "password";
api.isProduction = false;

api.cacheToken = true;

//api.printMsg();

// api.getCurrentUserDetails().then(user => {
//     console.log(user);
//     return user;
// });

// api.getWallets().then(wallets => {
//     //console.log(wallets);
//     return wallets;
// });

// api.getMerchantProfileById('7').then(response => {
//     //console.log(response);
//     return response;
// })
// api.listMerchantProfiles({
//         page: 0,
//         size: 10,
//         merchantName: "name",
//         sort: ["sort1" , "sort2"]
//     })
//     .then((response) => {
//         //console.log(wallets);
//         return response;
//     });

// api.updateMerchantProfileById("7",{"body": "test"}).then((response) => {
//   //console.log(response);
//   return response;
// });

// api
//   .listServiceProviders({
//     countryCode: "sdcsdf",
//     currencyCode: "sda",
//     // page: 0,
//     // size: 10,
//     sort: ["sort1", "sort2"],
//   })
//   .then((response) => {
//     //console.log(wallets);
//     return response;
//   });

// api
//   .listBanksOfServiceProvider({
//     serviceProviderId: "aS",
//     countryCode: "sdcsdf",
//     currencyCode: "sda",
//     // page: 0,
//     // size: 10,
//     sort: ["sort1", "sort2","SJNFJNS"],
//   })
//   .then((response) => {
//     //console.log(wallets);
//     return response;
//   });

// api
//   .getCurrentRate({
//     fromCurrency: "aS",
//     toCurrency: "sdcsdf",
//     amount: 10,
//   })
//   .then((response) => {
//     //console.log(wallets);
//     return response;
//   });

// api.listExecutiveDocuments().then((response) => {
//   //console.log(wallets);
//   return response;
// });

// api.listFees().then((response) => {
//   //console.log(wallets);
//   return response;
// });

// api.listServiceProviderKYC().then((response) => {
//   //console.log(wallets);
//   return response;
// });

// api
//   .listMerchantWallets({
//     // merchantName: "sdcsdf",
//     page: 0,
//     size: 10,
//     sort: ["sort1", "sort2"],
//   })
//   .then((response) => {
//     //console.log(wallets);
//     return response;
//   });

api.listRiskScoringAssesments().then((response) => {
  //console.log(wallets);
  return response;
});
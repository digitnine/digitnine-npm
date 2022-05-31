const eps = require('./lib/entrypoints');
const idm = require('./lib/idm');

exports.printMsg = function() {
    console.log("This is a message from the demo package");
    eps.printMsg();
    idm.printMsg();
  }
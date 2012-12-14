// Example obscuro usage.

var obscuro = require('../obscuro.js');

var obj = {};
obj.secret = 'Squeamish Ossifrage';

var secret = 'don\'t tell';

var encryptedSerialized = obscuro.serializeEncrypt(obj,secret);

    console.log(obj);
    console.log('encrypted, is: '+encryptedSerialized);
    console.log('decrypted, '+encryptedSerialized+' is:');

var decryptedObj = obscuro.deserializeEncrypted(encryptedSerialized, secret);

    console.log(decryptedObj);


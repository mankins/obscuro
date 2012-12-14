obscuro
=======

easy encrypted data serialization

Encrypts and serializes an object for transport.

##Usage

```
var obscuro = require ('obscuro');

var secret = 'don\'t tell';

var obj = {};
obj.secret = 'Squeamish Ossifrage';

var encryptedSerialized = obscuro.serializeEncrypt(obj,secret);

    console.log(obj);
    console.log('encrypted, is: '+encryptedSerialized);
    console.log('decrypted, '+encryptedSerialized+' is:');

var decryptedObj = obscuro.deserializeEncrypted(encryptedSerialized, secret);

    console.log(decryptedObj);

```

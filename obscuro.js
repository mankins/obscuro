  // obscuro - simply encrypt, transport, decrypt yr data
  //
  // code from express cookie serialization middleware

  var crypto = require("crypto");

  exports.encrypt = function(sourceString, encryptionKey) {

    if (typeof encryptionKey !== 'string') {
      throw "missing encryption key";
    }

    sourceString = encryptionKey + sourceString;

    var cipher = crypto.createCipher("aes192", encryptionKey);
    return cipher.update(sourceString, 'utf8', 'base64') + cipher.final('base64');
  };

  exports.decrypt = function(cipherText, encryptionKey) {

    if (typeof encryptionKey !== 'string') {
      throw "missing decryption key";
    }

    var decipher = crypto.createDecipher("aes192", encryptionKey);
    return decipher.update(cipherText, 'base64', 'utf8') + decipher.final('utf8');
  };

  exports.validEncryption = function(sourceString, encryptionKey) {

    if (typeof encryptionKey !== 'string') {
      throw "missing encryption key";
    }

    // Tests the validity of the encrypted string. Simple test popping secret on string.
    var shouldBeSecret = sourceString.slice(0, encryptionKey.length);
    return(
    encryptionKey === shouldBeSecret);
  };

  exports.serializeEncrypt = function(source, encryptionKey) {

    if (typeof encryptionKey !== 'string') {
      throw "missing encryption key";
    }

    // given an object, serialize it in a way that we can transport it
    return(this.encrypt(this.serialize(source), encryptionKey));
  };

  exports.deserializeEncrypted = function(cipherText, encryptionKey) {

    // given an object, serialize it in a way that we can transport it
    if (typeof encryptionKey !== 'string') {
      throw "missing encryption key";
    }

    var decrypted = this.decrypt(cipherText, encryptionKey);
    if(this.validEncryption(decrypted, encryptionKey)) {

      // remove the key from the start
      decrypted = decrypted.slice(encryptionKey.length);

      return this.deserialize(decrypted);

    } else {
      // error decrypting
      console.log('decrypting error:' + cipherText);
      return null;
    }
  };

  exports.serialize = function(source) {

    // just a little wrapper around JSON.stringify, adding try/catch
    try {

      var serialized = JSON.stringify(source);
      return serialized;

    } catch(e) {
      console.log('error serializing: ' + e.message);
      return null;
    }
  };

  exports.deserialize = function(serialized) {

    // just a little wrapper around JSON.parse, adding try/catch
    try {

      var source = JSON.parse(serialized);
      return source;

    } catch(e) {
      console.log('error deserializing: ' + e.message);
      return null;
    }
  };
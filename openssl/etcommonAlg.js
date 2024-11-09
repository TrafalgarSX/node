const crypto = require('crypto');
// import crypto from 'crypto';

const IV_LENGTH = 16;

// 对称加密
function symmEncrypt(algorithm, key, iv, text, inputEncoding, outputEncoding) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  // input, input encoding, output encoding
  let encrypted = cipher.update(text, inputEncoding, outputEncoding);  
  encrypted += cipher.final(outputEncoding);
  return  encrypted;
}

// 对称解密
function symmDecrypt(algorithm, key, iv, encrypted, inputEncoding, outputEncoding) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  // input, input encoding, output encoding
  let decrypted = decipher.update(encrypted, inputEncoding, outputEncoding);  
  decrypted += decipher.final(outputEncoding);
  return decrypted;
}

let algorithm = 'aes-256-cbc';
let key = Buffer.from('267746D57C46ADBB1182DAE33935507A2073B036A3DFA01A3FE57D62CF525966', 'hex');
// let iv = crypto.randomBytes(IV_LENGTH);
let iv = Buffer.from('859eec18673b7fd67d8f945e0fe0b5ca', 'hex');
// out put iv as hex
let ivHex = iv.toString('hex');
console.log(ivHex);
let inputEncoding = 'hex';
let outputEncoding = 'hex';

// aes-256-cbc
let encrypted = symmEncrypt(algorithm, key, iv, '68656C6C6F', inputEncoding, outputEncoding);
console.log('aes-256-cbc encrypted hex result is :' + encrypted.toUpperCase());

let decrypted = symmDecrypt(algorithm, key, iv, encrypted, inputEncoding, outputEncoding);
console.log('aes-256-cbc decrypted hex result is :' + decrypted.toUpperCase());

// sm4 encrypt
algorithm = 'sm4-cbc';
key = Buffer.from('267746D57C46ADBB1182DAE33935507A', 'hex');

encrypted = symmEncrypt(algorithm, key, iv, '68656C6C6F', inputEncoding, outputEncoding);
console.log('sm4-cbc encrypted hex result is :' + encrypted.toUpperCase());

decrypted = symmDecrypt(algorithm, key, iv, encrypted, inputEncoding, outputEncoding);
console.log('sm4-cbc decrypted hex result is :' + decrypted.toUpperCase());

// hash function
function hashFunc(alg, inputEncoding, outputEncoding, text) {
  let hash = crypto.createHash(alg);
  hash.update(text, inputEncoding, outputEncoding);
  return hash.digest(outputEncoding);
}

let hashHexRet = hashFunc('sha256', 'utf8', 'hex', 'hello');
console.log('sha256 hash result is :' + hashHexRet.toUpperCase());

// sm3
hashHexRet = hashFunc('sm3', 'utf8', 'hex', 'hello');
console.log('sha256 hash result is :' + hashHexRet.toUpperCase());

// hmac
function hmacFunc(alg, key, inputEncoding, outputEncoding, text) {
  let hmac = crypto.createHmac(alg, key);
  hmac.update(text, inputEncoding, outputEncoding);
  return hmac.digest(outputEncoding);
}

let sm3HmacKey = Buffer.from('267746D57C46ADBB1182DAE33935507A2073B036A3DFA01A3FE57D62CF52596628B40C664BADA51F3F80EF2CB596D2A335A034007F90E224B9CDE7D91CEC50DC', 'hex');
let hmacHexRet = hmacFunc('sm3', sm3HmacKey, 'utf8', 'hex', 'hello');
console.log('sm3 hmac result is :' + hmacHexRet.toUpperCase());




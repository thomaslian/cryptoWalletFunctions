var crypto = require("crypto-js");

// This file was inspired by: https://embed.plnkr.co/0VPU1zmmWC5wmTKPKnhg/
function encrypt(text, password) {
    const salt = crypto.lib.WordArray.random(128 / 8);
    const key = crypto.PBKDF2(password, salt);
    const iv = crypto.lib.WordArray.random(128 / 8);
    const encrypted = crypto.AES.encrypt(text, key, { iv: iv });

    return salt.toString() + iv.toString() + encrypted.toString();
}

function decrypt(text, password) {
    const salt = crypto.enc.Hex.parse(text.substring(0, 32));
    const iv = crypto.enc.Hex.parse(text.substring(32, 64));
    const encrypted = text.substring(64);
    const key = crypto.PBKDF2(password, salt);
    const decrypted = crypto.AES.decrypt(encrypted, key, { iv: iv });

    return decrypted.toString(crypto.enc.Utf8);
}

module.exports = {
    encrypt, 
    decrypt
}
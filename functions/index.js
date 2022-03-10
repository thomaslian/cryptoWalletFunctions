const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');

admin.initializeApp();

const bitcoin = require('./bitcoin');
exports.generateBitcoinKeys = bitcoin.generateKeys;
exports.generateBitcoinKeysEncrypted = bitcoin.generateKeysEncrypted;
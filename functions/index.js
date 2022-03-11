const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');

admin.initializeApp();

const bitcoin = require('./bitcoin');
exports.generateMnemonic = bitcoin.generateMnemonic;
exports.generateBitcoinKeys = bitcoin.generateKeys;
exports.generateBitcoinEncryptedKeys = bitcoin.generateEncryptedKeys;
exports.generateAndStoreBitcoinEncryptedKeys = bitcoin.generateAndStoreEncryptedKeys;
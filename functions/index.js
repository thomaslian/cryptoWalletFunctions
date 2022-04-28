const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');

admin.initializeApp();

const wallet = require('./wallet');
exports.generateMnemonic = wallet.generateMnemonic;
exports.generateWifKeys = wallet.generateWifKeys;
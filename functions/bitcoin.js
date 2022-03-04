// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
// Import ecpair to generate Bitcoin keys.
const { ECPairFactory } = require('ecpair');
const ecc = require('tiny-secp256k1');
const bitcoin = require('bitcoinjs-lib');

/**
 * Generate a new Bitcoin public key and private key
 */

exports.generateKeys = functions.region('europe-west3').https.onCall((data, context) => {

    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.makeRandom();

    const pubKey = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
    const privKey = keyPair.toWIF();

    return { pubKey, privKey };
});
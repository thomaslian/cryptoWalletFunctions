// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
// Import ecpair to generate Bitcoin keys.
const { ECPairFactory } = require('ecpair');
const ecc = require('tiny-secp256k1');

/**
 * Generate a new Bitcoin public key and private key
 */
 exports.generateKeys = functions.region('europe-west3').https.onCall(async (data, context) => {
    const ECPair = ECPairFactory(ecc)
    const keyPair = ECPair.makeRandom();

    const pubKey = keyPair.getPublicKeyBuffer().toString('hex');
    const privKey = keyPair.getPrivateKeyBuffer().toString('hex');

    return { pubKey, privKey };
});
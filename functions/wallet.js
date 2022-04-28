// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
// Import ecpair to generate Bitcoin keys.
const { ECPairFactory } = require('ecpair');
const ecc = require('tiny-secp256k1');
const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const cry = require("crypto");
const { encrypt, decrypt } = require('./crypto');

/**
 * Generates a random mnemonic and returns it.
 * @returns {string} - A random mnemonic.
 */
exports.generateMnemonic = functions.region('europe-west3').https.onCall((data, context) => {
    const randomBytes = cry.randomBytes(16);

    // Return word phrase
    return bip39.entropyToMnemonic(randomBytes.toString('hex'));
});

/**
 * Generate a new Bitcoin public key and private key. The private key is unencrypted.
 * @returns {object} - An object containing the public and private key.
 */
exports.generateWifKeys = functions.region('europe-west3').https.onCall((data, context) => {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.makeRandom();

    const publicKey = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
    const privateKey = keyPair.toWIF();

    return { publicKey, privateKey };
});

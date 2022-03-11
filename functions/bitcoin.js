// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
// Import ecpair to generate Bitcoin keys.
const { ECPairFactory } = require('ecpair');
const ecc = require('tiny-secp256k1');
const bitcoin = require('bitcoinjs-lib');
const { encrypt, decrypt } = require('./crypto');


/**
 * Generate a new Bitcoin public key and private key. The private key is unencrypted.
 */
exports.generateKeys = functions.region('europe-west3').https.onCall((data, context) => {
    return generateKeys();
});

exports.generateEncryptedKeys = functions.region('europe-west3').https.onCall((data, context) => {
    return generateEncryptedKeys(data.userPassword);
});

/**
 * Generate a new Bitcoin public key and private key. The private key is encrypted.
 * Data gets stored in the database. Including UID, Public Key and Private Key.
 */
exports.generateAndStoreEncryptedKeys = functions.region('europe-west3').https.onCall((data, context) => {
    const uid = context.auth.uid;
    const password = data.userPassword;

    const keyPair = generateEncryptedKeys(password);

    admin.firestore().collection('users').doc(uid).set({
        uid,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey
    }).catch(error => {
        console.log(error);
        return error;
    });

    return keyPair;
});

/**
 * Generates a public and a private key.
 * @returns {object} - An object containing the public and private key.
 */
function generateKeys() {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.makeRandom();

    const publicKey = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
    const privateKey = keyPair.toWIF();

    return { publicKey, privateKey };
}

/**
 * Generates a public and a private key. The private key is encrypted with the input password.
 * @param {string} password - The password to encrypt the private key with.
 * @returns {object} - An object containing the public and encrypted private key.
 */
function generateEncryptedKeys(password) {
    let keyPair = generateKeys();
    keyPair.privateKey = encrypt(keyPair.privateKey, password);
    return keyPair;
}

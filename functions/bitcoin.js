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

/**
 * Generate a new Bitcoin public key and private key. The private key is encrypted.
 */
 exports.generateKeysEncrypted = functions.region('europe-west3').https.onCall((data, context) => {
    const uid = context.auth.uid;
    const password = data.userPassword;

    let keyPair = generateKeys();
    keyPair.privateKey = encrypt(keyPair.privateKey, password);

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

function generateKeys() {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.makeRandom();

    const publicKey = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
    const privateKey = keyPair.toWIF();

    return { publicKey, privateKey };
}

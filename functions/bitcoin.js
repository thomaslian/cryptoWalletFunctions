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
 * Generate a new Bitcoin public key and private key
 */
exports.generateKeys = functions.region('europe-west3').https.onCall((data, context) => {
    const uid = context.auth.uid;
    const password = data.userPassword;

    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.makeRandom();

    const publicKey = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
    const unencryptedPrivateKey = keyPair.toWIF();
    
    const privateKey = encrypt(unencryptedPrivateKey, password);

    admin.firestore().collection('users').doc(uid).set({
        uid,
        publicKey,
        privateKey
    }).catch(error => {
        console.log(error);
        return error;
    });

    return { publicKey, privateKey };
});
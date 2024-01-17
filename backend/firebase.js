const admin = require('firebase-admin');
const dotenv = require("dotenv").config();
const serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };

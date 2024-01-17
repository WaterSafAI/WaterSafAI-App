const admin = require('firebase-admin');
const dotenv = require("dotenv").config();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const secretManager = new SecretManagerServiceClient();

/**
 * 
 * @returns {Promise<admin.credential.Credential>}
 */
async function getFirebaseAdminCredential() {
    if (process.env.NODE_ENV === 'development') {
        // In local development, parse the JSON string from an environment variable
        return admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));
    } else {
        // In production, fetch the secret from Secret Manager
        const projectId = '858091661652';
        const secretName = 'FIREBASE_SERVICE_ACCOUNT_KEY';
        const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;

        try {
            const [version] = await secretManager.accessSecretVersion({ name });
            const serviceAccountKey = JSON.parse(version.payload.data.toString('utf8'));
            return admin.credential.cert(serviceAccountKey);
        } catch (error) {
            console.error("Error fetching Firebase Admin credentials:", error);
            throw error;
        }
    }
}

/**
 * Initialize Firebase and return the db and auth objects.
 * @returns {Promise<{db: admin.firestore.Firestore, auth: admin.auth.Auth}>}
 */
async function initializeFirebase() {
    const credential = await getFirebaseAdminCredential();

    admin.initializeApp({
        credential: credential,
    });

    const db = admin.firestore();
    const auth = admin.auth();

    // ... rest of your Firebase setup

    return { db, auth };
}

module.exports = initializeFirebase;

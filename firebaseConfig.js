const admin = require('firebase-admin');
const serviceAccount = require('studentassessmentdashboa-23340-firebase-adminsdk-uuoh3-7d9e57ca19.json.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };

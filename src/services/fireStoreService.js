const admin = require('firebase-admin');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore({
  projectId: 'nusantaread',
});

module.exports = {
  firestore,
  admin,
};

const admin = require('firebase-admin');
const serviceAccount = require('../path-to-your-google-services.json'); // Replace with the actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.login = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.status(200).json({ uid: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ error: 'Invalid ID token' });
  }
};

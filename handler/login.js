const firestore = require('./firestoreService');

async function loginUser(email, password) {
  try {
    if (!email || !password) {
      throw new Error('Email dan password diperlukan');
    }

    const userRef = firestore.collection('dataUser').doc(email);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();

    if (!userData || userData.password !== password) {
      throw new Error('Email atau password salah');
    }

    return true;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
}

module.exports = { loginUser };

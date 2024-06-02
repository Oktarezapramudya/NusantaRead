const firestore = require('./firestoreService');

async function registerUser(email, password) {
  try {
    if (!email || !password) {
      throw new Error('Email dan password diperlukan');
    }

    const userExists = await getUserData(email);
    if (userExists) {
      throw new Error('Email sudah digunakan');
    }

    await firestore.collection('dataUser').doc(email).set({ password });
    return true;
  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
}

async function getUserData(email) {
  try {
    const userRef = firestore.collection('dataUser').doc(email);
    const userSnapshot = await userRef.get();
    return userSnapshot.exists;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

module.exports = { registerUser };

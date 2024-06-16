const { firestore } = require('../services/firestoreService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await firestore.collection('users').doc(email).set({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await firestore.collection('users').doc(email).get();
    if (!userDoc.exists) {
      res.status(404).send('User not found');
      return;
    }

    const user = userDoc.data();
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).send('Invalid credentials');
      return;
    }

    const token = jwt.sign({ email: user.email }, 'your_jwt_secret');
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  register,
  login,
};

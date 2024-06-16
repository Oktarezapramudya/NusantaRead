const { firestore } = require('../services/firestoreService');

const saveActivity = async (req, res) => {
  const { type, description } = req.body;

  try {
    await firestore.collection('activities').add({
      type,
      description,
      createdAt: new Date(),
    });
    res.status(201).send('Activity saved');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  saveActivity,
};

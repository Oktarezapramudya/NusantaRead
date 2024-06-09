const axios = require('axios');

exports.getBooks = async (req, res) => {
  const query = 'subject:indonesia'; // Adjust the query for local literature

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyB7WSW4vgrJEiMKHcobAQw8dIEXOWPcFuc`);
    res.status(200).json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyB7WSW4vgrJEiMKHcobAQw8dIEXOWPcFuc`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book details' });
  }
};

exports.recordReading = async (req, res) => {
  const { userId, bookId, pageNumber } = req.body;

  try {
    // Implement the logic to store the user reading activity (e.g., using Firestore)
    res.status(200).json({ message: 'Reading activity recorded' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record reading activity' });
  }
};

const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'nusantaread',
  keyFilename: 'path-to-your-google-services.json', // Replace with actual path
});

// Di dalam `recordReading`:
try {
  await firestore.collection('readingActivities').add({
    userId,
    bookId,
    pageNumber,
    timestamp: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Reading activity recorded' });
} catch (error) {
  res.status(500).json({ error: 'Failed to record reading activity' });
}

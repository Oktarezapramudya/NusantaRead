const { getBooksByCategory } = require('../services/googleBooksService');
const { firestore } = require('../services/firestoreService');

const saveBooks = async (req, res) => {
  const category = 'Indonesia';
  try {
    const books = await getBooksByCategory(category);
    const batch = firestore.batch();

    books.forEach((book) => {
      const bookRef = firestore.collection('books').doc(book.id);
      batch.set(bookRef, book);
    });

    await batch.commit();
    res.status(200).send('Books saved');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSavedBooks = async (req, res) => {
  try {
    const booksSnapshot = await firestore.collection('books').get();
    const books = booksSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  saveBooks,
  getSavedBooks,
};

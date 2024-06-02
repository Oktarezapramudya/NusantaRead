const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'nusantaread',
});

async function storeData(id, data) {
  try {
    const predictCollection = db.collection('dataUser');
    await predictCollection.doc(id).set(data);
    console.log(`Data with ID ${id} stored successfully.`);
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
}

module.exports = { storeData };

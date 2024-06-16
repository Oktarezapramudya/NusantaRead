const axios = require('axios');

const getBooksByCategory = async (category) => {
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${indonesia}&key=YOUR_API_KEY`);
  return response.data.items;
};

module.exports = {
  getBooksByCategory,
};

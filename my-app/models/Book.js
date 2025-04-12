const { ObjectId } = require('mongodb');

const getBookCollection = async (client) => {
  return client.db('MotBookData').collection('Books');
};

module.exports = { getBookCollection };
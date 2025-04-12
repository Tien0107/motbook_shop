const { ObjectId } = require('mongodb');

const getUserCollection = async (client) => {
  return client.db('MotBookData').collection('Users');
};

module.exports = { getUserCollection };
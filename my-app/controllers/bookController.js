const { ObjectId } = require('mongodb');
const { getBookCollection } = require('../models/Book');

const uploadBook = async (req, res, client) => {
  try {
    const data = req.body;
    const bookCollection = await getBookCollection(client);
    const result = await bookCollection.insertOne(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

const getAllBooks = async (req, res, client) => {
  try {
    const bookCollection = await getBookCollection(client);
    let query = {};
    if (req.query?.category) {
      query = { category: req.query.category };
    }
    const result = await bookCollection.find(query).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

const updateBook = async (req, res, client) => {
  try {
    const id = req.params.id;
    const updateBookData = req.body;
    const bookCollection = await getBookCollection(client);
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: { ...updateBookData } };
    const options = { upsert: true };
    const result = await bookCollection.updateOne(filter, updateDoc, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

const deleteBook = async (req, res, client) => {
  try {
    const id = req.params.id;
    const bookCollection = await getBookCollection(client);
    const filter = { _id: new ObjectId(id) };
    const result = await bookCollection.deleteOne(filter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

const getBookById = async (req, res, client) => {
  try {
    const id = req.params.id;
    const bookCollection = await getBookCollection(client);
    const filter = { _id: new ObjectId(id) };
    const result = await bookCollection.findOne(filter);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

module.exports = { uploadBook, getAllBooks, updateBook, deleteBook, getBookById };
const Book = require('../models/Book');
const cloudinary = require('../config/cloudinary');
const { sendSuccess, sendError } = require('../utils/responseUtils');

// Public endpoints
const getAllBooks = async (req, res) => {
  try {
    let query = {};
    if (req.query?.category) {
      query.category = req.query.category;
    }
    const books = await Book.find(query);
    return sendSuccess(res, books);
  } catch (error) {
    return sendError(res, 'Error fetching books');
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return sendError(res, 'Book not found', 404);
    }
    return sendSuccess(res, book);
  } catch (error) {
    return sendError(res, 'Error fetching book');
  }
};

// Protected admin endpoints
const uploadBook = async (req, res) => {
  try {
    if (!req.user.hasPermission('manage_books')) {
      return sendError(res, 'Permission denied', 403);
    }

    const bookData = req.body;
    // Kiểm tra xem có ảnh được gửi lên không
    if (!bookData.images || !Array.isArray(bookData.images)) {
      return sendError(res, 'Book images are required', 400);
    }

    const book = new Book(bookData);
    await book.save();
    return sendSuccess(res, book, 'Book uploaded successfully', 201);
  } catch (error) {
    return sendError(res, 'Error uploading book');
  }
};

const updateBook = async (req, res) => {
  try {
    if (!req.user.hasPermission('manage_books')) {
      return sendError(res, 'Permission denied', 403);
    }

    const { id } = req.params;
    const updateData = req.body;

    // Tìm sách cũ để lấy thông tin ảnh
    const oldBook = await Book.findById(id);
    if (!oldBook) {
      return sendError(res, 'Book not found', 404);
    }

    // Nếu có ảnh mới được gửi lên, xóa ảnh cũ trên Cloudinary
    if (updateData.images && Array.isArray(updateData.images)) {
      // Xóa các ảnh cũ
      const deletePromises = oldBook.images
        .filter(image => image.public_id) // Chỉ xóa những ảnh có public_id
        .map(image => cloudinary.uploader.destroy(image.public_id));
      
      await Promise.all(deletePromises);
    }

    // Cập nhật sách với dữ liệu mới
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return sendSuccess(res, updatedBook, 'Book updated successfully');
  } catch (error) {
    console.error('Update book error:', error);
    return sendError(res, 'Error updating book');
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!req.user.hasPermission('manage_books')) {
      return sendError(res, 'Permission denied', 403);
    }

    const { id } = req.params;
    const book = await Book.findById(id);
    
    if (!book) {
      return sendError(res, 'Book not found', 404);
    }

    // Xóa tất cả ảnh của sách trên Cloudinary
    const deleteImagePromises = book.images
      .filter(image => image.public_id)
      .map(image => cloudinary.uploader.destroy(image.public_id));

    await Promise.all(deleteImagePromises);

    // Xóa sách khỏi database
    await Book.findByIdAndDelete(id);

    return sendSuccess(res, null, 'Book and its images deleted successfully');
  } catch (error) {
    console.error('Delete book error:', error);
    return sendError(res, 'Error deleting book');
  }
};

module.exports = { uploadBook, getAllBooks, updateBook, deleteBook, getBookById };
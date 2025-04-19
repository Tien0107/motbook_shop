const Book = require('../models/Book');
const cloudinary = require('../config/cloudinary');
const { sendSuccess, sendError } = require('../utils/responseUtils');
const { uploadMultiple } = require('../controllers/uploadController');
const { validateBookData } = require('../validators/bookValidator');

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
    console.log('Files after Multer:', req.files);
    console.log('Body after Multer:', req.body);
    if (!req.files || req.files.length === 0) {
      return sendError(res, 'Please upload at least one image', 400);
    }

    try {
      // Upload images to Cloudinary
      const uploadPromises = req.files.map(async file => {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = 'data:' + file.mimetype + ';base64,' + b64;

        return cloudinary.uploader.upload(dataURI, {
          folder: 'motbook/products',
          resource_type: 'auto',
          transformation: [
            { width: 800, crop: 'scale' },
            { quality: 'auto' },
          ],
        });
      });

      const results = await Promise.all(uploadPromises);

      // Transform Cloudinary results to image data
      const images = results.map(result => ({
        url: result.secure_url,
        public_id: result.public_id,
      }));

      // Create book with uploaded image data
      const bookData = {
        ...req.body,
        images
      };

      // Validate book data
      const { isValid, message } = validateBookData(bookData);
      if (!isValid) {
        return sendError(res, message, 400);
      }

      const book = new Book(bookData);
      await book.save();

      return sendSuccess(res, book, 'Book created successfully', 201);
    } catch (error) {
      console.error('Upload/Save error:', error);
      return sendError(res, 'Error processing book upload', 500);
    }

  } catch (error) {
    console.error('Book creation error:', error);
    return sendError(res, 'Error creating book', 500);
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

      // Thêm ảnh mới với Cloudinary
      const newImagePromises = updateData.images.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        const dataURI = 'data:' + image.mimetype + ';base64,' + b64;

        return cloudinary.uploader.upload(dataURI, {
          folder: 'motbook/products',
          resource_type: 'auto',
          transformation: [
            { width: 800, crop: 'scale' },
            { quality: 'auto' },
          ],
        });
      });

      const newImageResults = await Promise.all(newImagePromises);

      updateData.images = newImageResults.map(result => ({
        url: result.secure_url,
        public_id: result.public_id,
      }));
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
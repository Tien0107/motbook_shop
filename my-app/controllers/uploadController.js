const cloudinary = require('../config/cloudinary');
const { sendSuccess, sendError } = require('../utils/responseUtils');
const multer = require('multer');
const {
	validateImageType,
	validateImageSize,
} = require('../utils/uploadUtils');

// Configure multer for memory storage
const storage = multer.memoryStorage();

// Single upload configuration for avatar
const uploadSingle = multer({
	storage,
	limits: {
		fileSize: 2 * 1024 * 1024, // 2MB limit for avatars
	},
	fileFilter: (req, file, cb) => {
		if (!validateImageType(file.mimetype)) {
			cb(
				new Error('Invalid image type. Allowed types: jpeg, png, gif, webp'),
				false,
			);
			return;
		}
		if (!validateImageSize(file.size)) {
			cb(new Error('Image too large. Maximum size: 2MB'), false);
			return;
		}
		cb(null, true);
	},
}).single('image');

// Multiple upload configuration for products
const uploadMultiple = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit for product images
		files: 5, // Maximum 5 files
	},
	fileFilter: (req, file, cb) => {
		if (!validateImageType(file.mimetype)) {
			cb(
				new Error('Invalid image type. Allowed types: jpeg, png, gif, webp'),
				false,
			);
			return;
		}
		if (!validateImageSize(file.size)) {
			cb(new Error('Image too large. Maximum size: 5MB'), false);
			return;
		}
		cb(null, true);
	},
}).array('images', 5);

// Upload single image (for avatar)
const handleSingleUpload = async (req, res) => {
	try {
		uploadSingle(req, res, async err => {
			if (err) {
				return sendError(res, err.message, 400);
			}

			if (!req.file) {
				return sendError(res, 'Please upload an image', 400);
			}

			// Convert buffer to base64
			const b64 = Buffer.from(req.file.buffer).toString('base64');
			let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

			try {
				// Upload to cloudinary
				const result = await cloudinary.uploader.upload(dataURI, {
					folder: 'motbook/avatars',
					resource_type: 'auto',
					transformation: [
						{ width: 250, height: 250, crop: 'fill' },
						{ quality: 'auto' },
					],
				});

				return sendSuccess(
					res,
					{
						url: result.secure_url,
						public_id: result.public_id,
					},
					'Avatar uploaded successfully',
					201,
				);
			} catch (error) {
				console.error('Cloudinary upload error:', error);
				return sendError(res, 'Error uploading to cloud storage', 500);
			}
		});
	} catch (error) {
		console.error('Upload error:', error);
		return sendError(res, 'Error processing upload', 500);
	}
};

// Upload multiple images (for products)
const handleMultipleUpload = async (req, res) => {
	try {
		uploadMultiple(req, res, async err => {
			if (err) {
				return sendError(res, err.message, 400);
			}

			if (!req.files || req.files.length === 0) {
				return sendError(res, 'Please upload at least one image', 400);
			}

			try {
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

				const uploadedImages = results.map(result => ({
					url: result.secure_url,
					public_id: result.public_id,
				}));

				return sendSuccess(
					res,
					{
						images: uploadedImages,
					},
					'Product images uploaded successfully',
					201,
				);
			} catch (error) {
				console.error('Cloudinary upload error:', error);
				return sendError(res, 'Error uploading to cloud storage', 500);
			}
		});
	} catch (error) {
		console.error('Upload error:', error);
		return sendError(res, 'Error processing upload', 500);
	}
};

// Delete image
const deleteImage = async (req, res) => {
	try {
		const { public_id } = req.body;

		if (!public_id) {
			return sendError(res, 'Public ID is required', 400);
		}

		const result = await cloudinary.uploader.destroy(public_id);

		if (result.result === 'ok') {
			return sendSuccess(res, null, 'Image deleted successfully');
		} else {
			return sendError(res, 'Error deleting image', 400);
		}
	} catch (error) {
		console.error('Delete error:', error);
		return sendError(res, 'Error deleting image', 500);
	}
};

module.exports = {
	handleSingleUpload,
	handleMultipleUpload,
	deleteImage,
};

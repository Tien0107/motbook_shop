const validateBookData = bookData => {
	const { title, author, price, images, description, publishYear } = bookData;

	if (!title || !author || !price) {
		return {
			isValid: false,
			message: 'Vui lòng cung cấp đầy đủ tiêu đề, tác giả và giá sách',
		};
	}

	if (price < 0) {
		return {
			isValid: false,
			message: 'Giá sách không thể là số âm',
		};
	}

	if (
		publishYear &&
		(publishYear < 1800 || publishYear > new Date().getFullYear())
	) {
		return {
			isValid: false,
			message: 'Năm xuất bản không hợp lệ',
		};
	}

	if (images.length === 0) {
		return {
			isValid: false,
			message: 'Vui lòng cung cấp hình ảnh cơ bản',
		};
	}

	if (!description) {
		return {
			isValid: false,
			message: 'Vui lòng cung cấp mô tả',
		};
	}

	return { isValid: true };
};

const validateUpdateBookData = bookData => {
	if (Object.keys(bookData).length === 0) {
		return {
			isValid: false,
			message: 'Không có dữ liệu cập nhật',
		};
	}

	if (bookData.price && bookData.price < 0) {
		return {
			isValid: false,
			message: 'Giá sách không thể là số âm',
		};
	}

	if (
		bookData.publishYear &&
		(bookData.publishYear < 1800 ||
			bookData.publishYear > new Date().getFullYear())
	) {
		return {
			isValid: false,
			message: 'Năm xuất bản không hợp lệ',
		};
	}

	return { isValid: true };
};

module.exports = {
	validateBookData,
	validateUpdateBookData,
};

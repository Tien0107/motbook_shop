const validateImageType = mimetype => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	return allowedTypes.includes(mimetype);
};

const validateImageSize = (size, maxSize = 50 * 1024 * 1024) => {
	return size <= maxSize;
};

module.exports = {
	validateImageType,
	validateImageSize,
};

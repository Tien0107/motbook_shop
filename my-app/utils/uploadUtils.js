const validateImageType = mimetype => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	return allowedTypes.includes(mimetype);
};

const validateImageSize = size => {
	const maxSize = 5 * 1024 * 1024; // 5MB
	return size <= maxSize;
};

module.exports = {
	validateImageType,
	validateImageSize,
};

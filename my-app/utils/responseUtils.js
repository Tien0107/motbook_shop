const sendSuccess = (
	res,
	data = null,
	message = 'Thành công',
	statusCode = 200,
) => {
	return res.status(statusCode).json({
		success: true,
		message,
		data,
	});
};

const sendError = (res, message = 'Có lỗi xảy ra', statusCode = 500) => {
	return res.status(statusCode).json({
		success: false,
		message,
	});
};

const handleAsync = fn => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(error => {
			console.error('Error:', error);
			return sendError(res, error.message);
		});
	};
};

module.exports = {
	sendSuccess,
	sendError,
	handleAsync,
};

const validateSignupData = (email, password, name) => {
	if (!email || !password || !name) {
		return {
			isValid: false,
			message: 'Vui lòng cung cấp đầy đủ email, mật khẩu và tên',
		};
	}
	return { isValid: true };
};

const validateLoginData = (email, password) => {
	if (!email || !password) {
		return {
			isValid: false,
			message: 'Vui lòng cung cấp email và mật khẩu',
		};
	}
	return { isValid: true };
};

module.exports = {
	validateSignupData,
	validateLoginData,
};

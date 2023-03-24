const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.username = !isEmpty(data.username) ? data.username : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (Validator.isEmpty(data.username)) {
		errors.username = `Необходимо заполнить поле "Имя пользователя"`;
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = `Необходимо заполнить поле "E-mail"`;
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Некорректный Email";
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "Необходимо ввести пароль";
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Подтвердите пароль";
	}
	if (!Validator.isLength(data.password, { min: 1, max: 30 })) {
		errors.password = "Пароль должен содержать хотя бы 1 символ";
	}
	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Пароли должны совпадать";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};

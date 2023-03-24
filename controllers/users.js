const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
require("dotenv").config();

exports.register = (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ message: "Такой Email адрес уже занят" });
		} else {
			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) =>
							res
								.status(201)
								.json({ message: "Пользователь успешно зарегистрирован!" })
						);
				});
			});
		}
	});
};

exports.login = (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) {
			return res
				.status(404)
				.json({ message: "Пользователь с таким Email не найден" });
		}

		if (user.isBlocked) {
			return res.status(404).json({ message: "Пользователь заблокирован" });
		}

		user.lastLogin = Date.now();
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = {
					id: user._id,
					username: user.username,
				};
				jwt.sign(
					payload,
					process.env.SECRET,
					{
						expiresIn: "1h",
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token,
							userId: user._id,
							username: user.username,
						});
					}
				);
			} else {
				return res.status(400).json({ message: "Неправильный пароль" });
			}
		});
		user.save();
	});
};

exports.getUserData = (req, res) => {
	User.find({}).then((data) => {
		res.json(data);
	});
};

exports.deleteUsers = (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.status(400).json({ message: "Выберите пользователя" });
	}
	User.deleteMany({ _id: { $in: id } }, () => {
		res.json({ message: "Выбранные пользователи удалены" });
	});
};

exports.blockUsers = (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.status(400).json({ message: "Выберите пользователя" });
	}

	User.updateMany({ _id: id }, { $set: { isBlocked: true } }, () => {
		res.json({ message: "Выбранные пользователи заблокированы" });
	});
};

exports.unblockUsers = (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.status(400).json({ message: "Выберите пользователя" });
	}
	User.updateMany({ _id: id }, { $set: { isBlocked: false } }, () => {
		res.json({ message: "Выбранные пользователи разблокированы" });
	});
};

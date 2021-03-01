const restify = require("restify");

const validator = module.exports = {
	/**
	 * Validate Email
	 *
	 * @param email
	 * @returns {boolean}
	 */
	isEmail: (email) => {
		const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		if (!emailRegex.test(email)) {
			return false;
		}

		return true;
	},

	/**
	 * Is Phone
	 *
	 * @param phone
	 * @returns {boolean}
	 */
	isPhone: (phone) => {
		const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if (!phoneRegex.test(phone)) {
			return false;
		}

		return true;
	},

	/**
	 * Is ZipCode
	 *
	 * @param zip
	 * @returns {boolean}
	 */
	isZipCode: (zip) => {
		const zipCodeRegEx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		if (!zipCodeRegEx.test(zip)) {
			return false;
		}

		return true;
	},

	/**
	 * Is Integer
	 *
	 * @param int
	 * @returns {boolean}
	 */
	isInteger: (int) => {
		if (isNaN(int)) {
			return false;
		}

		return true;
	},

	/**
	 * Validation Error
	 *
	 * @param string
	 * @param required
	 * @returns {restify.errors.BadRequestError}
	 */
	validationError: (string, required = true) => {
		if (required) {
			return new restify.errors.BadRequestError(`${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()} is required`);
		}

		return new restify.errors.BadRequestError(`Invalid ${string.toLowerCase()}`);
	},

	/**
	 * Validate Integer
	 *
	 * @param value
	 * @param label
	 * @param isRequired
	 * @param callback
	 * @returns {*}
	 */
	validateInteger: (value, label, isRequired = true, callback) => {
		if (typeof isRequired === "function") {
			callback = isRequired;
			isRequired = true;
		}

		if (isRequired && !value) {
			return callback(validator.validationError(label));
		}

		if (typeof value !== "undefined" && !validator.isInteger(value)) {
			return callback(validator.validationError(label, false));
		}

		return callback();
	},

	/**
	 * Validate Fields
	 *
	 * @param fields
	 * @param callback
	 * @returns {*}
	 */
	validateFields: (fields, callback) => {
		if (fields.length === 0) {
			return callback();
		}

		fields.forEach((field) => {
			if (!field.validateIfDefined || field.validateIfDefined && typeof field.value !== "undefined") {
				if (field.type === "integer") {
					validator.validateInteger(field.value, field.label, !field.optional, (err) => {
						if (err) {
							return callback(err);
						}
					});
				} else if (!field.optional && !field.value) {
					return callback(validator.validationError(field.label));
				}
			}
		});

		return callback();
	}
};

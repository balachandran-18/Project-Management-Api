const crypto = require("crypto");

const saltLength = 32;

module.exports = {
	getRandomString: () => {
		const randomBytes = crypto.randomBytes(Math.ceil(saltLength / 2));
		return randomBytes.toString("hex").slice(0, saltLength);
	}
};

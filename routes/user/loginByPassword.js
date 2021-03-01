const restify = require("restify");
const utils = require("../../lib/utils");
const { User } = require("../../db").models;
const md5 = require("md5");

function loginByPassword(req, res, next) {
    const data = req.body;

    const { email, password } = data;

    if (!email) {
        return next(new restify.errors.BadRequestError("Email Address is required"));
    }

    if (!password) {
        return next(new restify.errors.BadRequestError("Password is required"));
    }

    User
        .findOne({
            attributes: ["id", "first_name", "session_id", "password"],
            where: { email }
        })
        .then((userDetails) => {
            if (!userDetails) {
                return next(new restify.errors.UnauthorizedError("This account is not yet registered with us"));
            }

            if (user.password !== md5(password)) {
                return next(new restify.errors.UnauthorizedError("Invalid credentials"));
            }

            const session_id = user.session_id || Math.floor(Date.now());

            user
                .updateAttributes({
                    last_loggedin_at: utils.getSQlCurrentDateTime(),
                    session_id
                })
                .then(() => {
                    res.json({
                        message: "User LoggedIn SuccessFully",
                        user: {
                            token: session_id,
                            id: user.id
                        }
                    });
                })
                .catch((err) => {
                    req.log.error(err);
                    return next(err);
                });
        });

}

module.exports = loginByPassword;
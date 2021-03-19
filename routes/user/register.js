const restify = require("restify");
const md5 = require("md5");
const validator = require("../../lib/validator");
const utils = require("../../lib/utils");
const { User } = require("../../db").models;
const path = require("path");

function register(req, res, next) {
    const data = req.body;

    const { email, password, firstName, lastName, role } = data;

    if (!firstName) {
        return next(new restify.errors.BadRequestError("First name is required"));
    }

    if (!lastName) {
        return next(new restify.errors.BadRequestError("Last name is required"));
    }

    if (!password) {
        return next(new restify.errors.BadRequestError("Password is required"));
    }

    if (!validator.isEmail(email)) {
        return next(new restify.errors.BadRequestError("Invalid email"));
    }

    User
        .findOne({
            where: { email }
        })
        .then((userExists) => {
            if (userExists) {
                return next(new restify.errors.BadRequestError("Email already exist"));
            }

            const session_id = Math.floor(Date.now());

            User
                .create({
                    email,
                    session_id,
                    password: md5(password),
                    first_name: firstName,
                    last_name: lastName,
                    role,
                    last_loggedin_at: utils.getSQlCurrentDateTime()
                })
                .then((user) => {
                    const user_id = user.get("id");

                    res.json({
                        message: "User Registered Successfully",
                        user: {
                            token: session_id,
                            id: user_id
                        }
                    });
                })
                .catch((err) => {
                    req.log.error(err);
                    next(err);
                });
        });
}

module.exports = register;
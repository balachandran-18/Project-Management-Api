const restify = require("restify");
const config = require("../lib/config");

const db = require("../db");
const { User } = db.models;

module.exports = (req, res, next) => {
    const token = req.header("authorization");

    if (!token) {
        return next(new restify.errors.UnauthorizedError("Missing authorization header"));
    }

    const currentUrl = req.route.path;

    const defaultKeyRoutes = [];
    if (defaultKeyRoutes.indexOf(currentUrl) > -1) {
        if (token !== config.defaultApiKey) {
            return next(new restify.errors.UnauthorizedError("Invalid Token"));
        }
        return next();
    }

    User
        .findOne({
            attributes: [
                "id", "first_name", "last_name", "email", "role", "profile_photo"
            ],
            where: { session_id: token }
        })
        .then((user) => {
            if (!user) {
                return next(new restify.errors.UnauthorizedError("Invalid Token"));
            }

            user = user.get();

            req.user = user;

            return next();
        });
};
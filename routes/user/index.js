const loginByPassword = require("./loginByPassword");
const register = require("./register");
const get = require("./get");
const verifyToken = require("../../middleware/verifyToken");

module.exports = (server) => {
    server.get("/user/v1", verifyToken, get);
    server.post("/user/v1/login", loginByPassword);
    server.post("/user/v1/register", register);
};
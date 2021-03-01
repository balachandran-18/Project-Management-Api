const verifyToken = require("../../middleware/verifyToken");
const create = require("./create");
const update = require("./update");
const list = require("./list");
const get = require("./get");

module.exports = (server) => {
    server.get("/project/user/v1/list", list);
    server.get("/project/user/v1/:id", get);
    server.post("/project/user/v1", create);
    server.post("/project/user/v1/:id", update);
};
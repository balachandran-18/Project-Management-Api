const verifyToken = require("../../middleware/verifyToken");
const create = require("./create");
const update = require("./update");
const list = require("./list");
const get = require("./get");

module.exports = (server) => {
    server.get("/project/v1/list", list);
    server.get("/project/v1/:id", get);
    server.post("/project/v1", create);
    server.post("/project/v1/:id", update);
};
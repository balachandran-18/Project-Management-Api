const config = require("../../lib/config");

function get(req, res) {
    const user = req.user;

    res.json(user);
};

module.exports = get;
const validator = require("../../lib/validator");
const utils = require("../../lib/utils");
const md5 = require("md5");
const { Project } = require("../../db").models;

function update(req, res, next) {
    const data = req.body;

    const { name, description, batch, staffId } = data;

    const projectId = req.params.id;

    const updateData = {
        name,
        description,
        batch,
        staff_id: staffId
    };

    Project.update(utils.removeUndefinedKeys(updateData), { where: { id: projectId } })
        .then(() => {
            res.json({ message: "Project updated successfully" });
        })
        .catch((err) => {
            req.log.error(err);
            return next(err);
        });
};

module.exports = update;
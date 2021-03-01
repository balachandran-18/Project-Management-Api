const validator = require("../../lib/validator");
const utils = require("../../lib/utils");
const md5 = require("md5");
const { Project } = require("../../db").models;

function update(req, res, next) {
    const data = req.body;

    const { projectId, userId } = data;

    const id = req.params.id;

    const updateData = {
        user_id: userId,
        project_id: projectId
    };

    ProjectUser.update(utils.removeUndefinedKeys(updateData), { where: { id } })
        .then(() => {
            res.json({ message: "Project user updated successfully" });
        })
        .catch((err) => {
            req.log.error(err);
            return next(err);
        });
};

module.exports = update;
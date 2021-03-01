const restify = require("restify");
const { ProjectUser } = require("../../db").models;

function get(req, res, next) {
    const id = req.params.id;

    ProjectUser
        .findOne({
            where: { id }
        })
        .then((projectUserDetails) => {
            if (!projectUserDetails) {
                return next(new restify.errors.BadRequestError("Project user not found"));
            }

            res.json({
                id: projectUserDetails.id,
                userId: projectUserDetails.user_id,
                projectId: projectUserDetails.project_id,
                createdAt: projectUserDetails.created_at,
            });
        })
        .catch((err) => {
            req.log.error(err);
            next(err);
        });
}
module.exports = get;
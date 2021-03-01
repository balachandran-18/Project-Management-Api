const restify = require("restify");
const { Project } = require("../../db").models;

function get(req, res, next) {
    const id = req.params.id;

    Project
        .findOne({
            where: { id }
        })
        .then((projectDetails) => {
            if (!projectDetails) {
                return next(new restify.errors.BadRequestError("Project not found"));
            }

            res.json({
                id: projectDetails.id,
                name: projectDetails.name,
                description: projectDetails.description,
                batch: projectDetails.batch,
                staffId: projectDetails.staff_id,
                createdAt: projectDetails.created_at,
            });
        })
        .catch((err) => {
            req.log.error(err);
            next(err);
        });
}
module.exports = get;
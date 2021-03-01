const db = require("../../db");
const { ProjectUser } = db.models;
const restify = require("restify");

function create(req, res, next) {
    const data = req.body;

    const { projectId, userId } = data;

    if (!projectId) {
        return next(new restify.errors.BadRequestError("Project is required"));
    }

    if (!userId) {
        return next(new restify.errors.BadRequestError("User is required"));
    }

    ProjectUser
        .findOne({
            attribute: ["id"],
            where: {
                user_id: userId,
                project_id: projectId
            }
        })
        .then((projectExists) => {
            if (projectExists) {
                return next(new restify.errors.BadRequestError("Project user already exists"));
            }

            ProjectUser
                .create({
                    user_id: userId,
                    project_id: projectId
                })
                .then((projectUserDetails) => {
                    res.json(201, {
                        message: "Project user added successfully",
                        projectUserId: projectUserDetails.id
                    });
                })
                .catch((err) => {
                    req.log.error(err);
                    return next(err);
                });
        });
}

module.exports = create;
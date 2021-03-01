const validator = require("../../lib/validator");
const db = require("../../db");
const { Project } = db.models;
const restify = require("restify");

function create(req, res, next) {
    const data = req.body;

    const { name, description, batch, staffId } = data;

    if (!name) {
        return next(new restify.errors.BadRequestError("Name is required"));
    }

    if (!description) {
        return next(new restify.errors.BadRequestError("Description is required"));
    }

    if (!batch) {
        return next(new restify.errors.BadRequestError("Batch is required"));
    }

    // if (!staffId) {
    //     return next(new restify.errors.BadRequestError("Staff is required"));
    // }

    Project
        .findOne({ attribute: ["id", "name"], where: { name } })
        .then((projectExists) => {
            if (projectExists) {
                return next(new restify.errors.BadRequestError("Project is already exists"));
            }

            Project
                .create({
                    name,
                    description,
                    batch,
                    staff_id: staffId
                })
                .then((projectDetails) => {
                    res.json(201, {
                        message: "Project added successfully",
                        projectId: projectDetails.id
                    });
                })
                .catch((err) => {
                    req.log.error(err);
                    return next(err);
                });
        });
}

module.exports = create;
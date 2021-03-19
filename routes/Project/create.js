const validator = require("../../lib/validator");
const db = require("../../db");
const { Project } = db.models;
const restify = require("restify");

function create(req, res, next) {
    const data = req.body;

    const { name, description, status, technology,  staffId, teamLeadId } = data;

    if (!name) {
        return next(new restify.errors.BadRequestError("Name is required"));
    }

    if (!description) {
        return next(new restify.errors.BadRequestError("Description is required"));
    }

    if (!status) {
        return next(new restify.errors.BadRequestError("Status is required"));
    }

    if (!teamLeadId) {
        return next(new restify.errors.BadRequestError("Team Lead is required"));
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
                    status,
                    technology,
                    staff_id: staffId,
                    team_lead_id: teamLeadId
                })
                .then((projectDetails) => {
                    res.json(201, {
                        message: "Project added successfully",
                        projectDetails: {
                            id: projectDetails.id,
                            name: projectDetails.name,
                            description: projectDetails.description,
                            status: projectDetails.status,
                            technology: projectDetails.technology,
                            staffId: projectDetails.staff_id,
                            teamLeadId: projectDetails.team_lead_id,
                            createdAt: projectDetails.created_at,
                        }
                    });
                })
                .catch((err) => {
                    req.log.error(err);
                    return next(err);
                });
        });
}

module.exports = create;
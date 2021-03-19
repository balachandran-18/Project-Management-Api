const restify = require("restify");
const { Project, User, TeamUser } = require("../../db").models;

function get(req, res, next) {
    const id = req.params.id;

    Project
        .findOne({
            attributes: [
                "id",
                "name",
                "description",
                "technology",
                "status",
                "staff_id",
                "team_lead_id",
                "createdAt",
                "updatedAt",
            ],
            include:[
                // {
                //     required: false,
                //     model: User,
                //     as: "staffUser",
                //     attributes: [
                //         "id",
                //         "first_name",
                //         "last_name",
                //         "createdAt",
                //         "updatedAt",
                //     ],
                // },
                {
                    required: false,
                    model: TeamUser,
                    as: "TeamUser",
                    attributes: [
                        "id",
                        "user_id",
                        "team_lead_id",
                        "createdAt",
                        "updatedAt",
                    ],
                    include:[
                        {
                            required: false,
                            model: User,
                            as: "teamMember",
                            attributes: [
                                "id",
                                "first_name",
                                "last_name",
                                "createdAt",
                                "updatedAt",
                            ],
                        },
                    ]
                },
            ],
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
                status: projectDetails.status,
                technology: projectDetails.technology,
                staffId: projectDetails.staff_id,
                teamLeadId: projectDetails.team_lead_id,
                createdAt: projectDetails.created_at,
            });
        })
        .catch((err) => {
            req.log.error(err);
            next(err);
        });
}
module.exports = get;
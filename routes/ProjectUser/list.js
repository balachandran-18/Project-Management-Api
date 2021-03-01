const restify = require("restify");
const utils = require("../../lib/utils");

const { ProjectUser } = require("../../db").models;

function list(req, res, next) {
    const data = req.query;
    const validOrder = ["ASC", "DESC"];

    const sortableField = {
        name: "ProjectUser.project_id"
    };

    let page, pageSize;

    const sort = data.sort || "project_id";
    // if (!Object.keys(sortableField).includes(sort)) {
    //     return next(new restify.errors.BadRequestError(`Unable to sort project user by ${sort}`));
    // }
    const sortDir = data.sortDir || "ASC";
    if (!validOrder.includes(sortDir)) {
        return next(new restify.errors.BadRequestError("Invalid sort order"));
    }

    const where = {};
    const projectId = data.projectId;
    if (projectId) {
        where.project_id = projectId;
    }

    const query = {
        where,
        order: "created_at Desc"
    };

    if (data.pagination) {
        page = data.page ? parseInt(data.page, 10) : 1;
        if (isNaN(page)) {
            return next(new restify.errors.BadRequestError("Invalid page"));
        }

        pageSize = data.pageSize ? parseInt(data.pageSize, 10) : 10;
        if (isNaN(pageSize)) {
            return next(new restify.errors.BadRequestError("Invalid page size"));
        }

        if (pageSize > 0) {
            query.limit = pageSize;
            query.offset = (page - 1) * pageSize;
        }
    }

    ProjectUser
        .findAndCountAll(query)
        .then((projectUsers) => {
            const projectUserList = [];
            projectUsers.rows.forEach((projectUserDetails) => {
                projectUserList.push({
                    id: projectUserDetails.id,
                    userId: projectUserDetails.user_id,
                    projectId: projectUserDetails.project_id,
                    createdAt: projectUserDetails.created_at,
                });
            });

            if (data.pagination) {
                const { count, currentPage, lastPage, pageStart, pageEnd } = utils.getPageDetails(projectUsers.count, page, pageSize, projectUserList.length);

                res.json({
                    count,
                    currentPage,
                    lastPage,
                    pageStart,
                    pageEnd,
                    projectUserList
                });
            } else {
                res.json({
                    projectUserList
                });
            }
        })
        .catch((err) => {
            req.log.error(err);
            next(err);
        });
}
module.exports = list;
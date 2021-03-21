const restify = require("restify");
const utils = require("../../lib/utils");

const config = require("../../lib/config");

const { Project } = require("../../db").models;

function list(req, res, next) {
    const data = req.query;
    const validOrder = ["ASC", "DESC"];

    const sortableField = {
        name: "Project.name"
    };

    let page, pageSize;

    const sort = data.sort || "name";
    if (!Object.keys(sortableField).includes(sort)) {
        return next(new restify.errors.BadRequestError(`Unable to sort project by ${sort}`));
    }
    const sortDir = data.sortDir || "ASC";
    if (!validOrder.includes(sortDir)) {
        return next(new restify.errors.BadRequestError("Invalid sort order"));
    }

    const where = {};
    const name = data.name;
    if (name) {
        where.name = { $like: `${name}%` };
    }

    const searchText = data.search;
    if (searchText) {
        where.$or = [{
            name: { $like: `%${searchText}%` },
        }];
    }

    const query = {
        where,
        order: `${sortableField[sort]} ${sortDir}`
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

    Project
        .findAndCountAll(query)
        .then((projects) => {
            const projectList = [];
            projects.rows.forEach((project) => {
                projectList.push({
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    batch: project.batch,
                    staffId: project.staff_id,
                    technology: project.technology,
                    batch: project.batch,
                    createdAt: project.created_at,
                });
            });

            if (data.pagination) {
                const { count, currentPage, lastPage, pageStart, pageEnd } = utils.getPageDetails(projects.count, page, pageSize, projectList.length);

                res.json({
                    count,
                    currentPage,
                    lastPage,
                    pageStart,
                    pageEnd,
                    projectList
                });
            } else {
                res.json({
                    projectList
                });
            }
        })
        .catch((err) => {
            req.log.error(err);
            next(err);
        });
}
module.exports = list;
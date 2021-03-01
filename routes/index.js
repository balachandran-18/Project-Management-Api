const user = require("./user");
const Project = require("./Project");
const ProjectUser = require("./ProjectUser");

function routes(server) {
    // candidateProfile(server);
    user(server);
    Project(server);
    ProjectUser(server);
};

module.exports = routes;
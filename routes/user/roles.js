const roles = module.exports = {
    ADMIN: 1,
    STAFF: 2,
    TEAM_LEAD: 3,
    TEAM_MEMBER: 4,

    getText: (role) => {
        if (role === roles.ADMIN) {
            return "Admin";
        }

        if (role === roles.STAFF) {
            return "Staff";
        }

        if (role === roles.TEAM_LEAD) {
            return "Team Lead";
        }

        if (role === roles.TEAM_MEMBER) {
            return "Team Member";
        }

        return "";
    }
};
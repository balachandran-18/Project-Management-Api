const roles = module.exports = {
    ADMIN: 1,
    STAFF: 2,
    STUDENT: 3,

    getText: (role) => {
        if (role === roles.ADMIN) {
            return "Admin";
        }

        if (role === roles.STAFF) {
            return "Staff";
        }

        if (role === roles.STUDENT) {
            return "Student";
        }

        return "";
    }
};
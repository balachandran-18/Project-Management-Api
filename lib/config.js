require("dotenv").config({ silent: true });

module.exports = {
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 80,
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        connectionLimit: process.env.DB_CONNECTIONLIMIT,
        debug: process.env.DB_POOLDEBUG,
        poolMax: process.env.DB_POOL_MAX || 10,
        poolMin: process.env.DB_POOL_MIN || 1,
        idle: process.env.DB_POOL_IDLE || 1000,
        logging: process.env.DB_LOGGING === "false" ? false : console.log
    },
    defaultApiKey: process.env.DEFAULT_API_KEY,
    jobsEmail: process.env.JOB_EMAIL,
    sendGridAPIKey: process.env.SENDGRID_API_KEY,
    baseUrl: process.env.BASE_URL,
    trackerAPIURL: process.env.BASE_URL
};
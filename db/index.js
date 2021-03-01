const Sequelize = require("sequelize");
const config = require("../lib/config").database;

const db = {};

db.connection = new Sequelize(config.database, config.user, config.password, {
	host: config.host,
	port: config.port,
	dialect: "mysql",
	pool: {
		max: config.poolMax,
		min: config.poolMin,
		idle: config.idle
	},
	debug: config.debug,
	logging: config.logging
});

db.models = require("./models")(db.connection, Sequelize);

db.sequelize = Sequelize;

db.connect = (callback) => {
	db.connection.authenticate()
		.then(() => callback())
		.catch((err) => callback(err));
};

module.exports = db;

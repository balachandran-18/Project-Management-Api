const config = require("./lib/config");
const restify = require("restify");
const db = require("./db");
const routes = require("./routes");

const server = restify.createServer({
    name: "project-management-api",
});

server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());

server.use((req, res, next) => {
    if ((req.method === "PUT" || req.method === "POST") && !req.body) {
        req.body = {};
    }
    next();
});

server.pre(new restify.CORS({
    origins: config.corsUrl,
    credentials: false,
    headers: ["authorization"]
}));

restify.CORS.ALLOW_HEADERS.push("authorization");

server.on("MethodNotAllowed", (req, res) => {
    if (req.method.toUpperCase() === "OPTIONS") {
        res.header("Access-Control-Allow-Headers", restify.CORS.ALLOW_HEADERS.join(", "));
        res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT");
        res.send(204);
    } else {
        res.send(new restify.MethodNotAllowedError());
    }
});

db.connect((err) => {
    if (err) {
        console.log(err, "Unable to connect to the database");
        server.close();
    }
    server.db = db;

    routes(server);

    server.listen(config.port, () => {
        console.log(`Project Management API Service listening on port ${config.port} in ${config.environment} mode`);
    });
});

process.on("SIGTERM", () => {
    console.log("Shutting the Project Management API Service down...");
    server.close();
    process.exit(0);
});

process.on("uncaughtException", (err) => {
    console.log(err, "Crashing with Error!");
    process.exit(1);
});
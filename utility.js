const fs = require("fs");
const resolve = require("path").resolve;

const readDatabase = () => {
    const readFile = fs.readFileSync(resolve("./database.json"), "utf-8");
    return JSON.parse(readFile);
};
const readDatabaseMiddleware = (req, res, next) => {
    req.database = readDatabase();
    next();
};

const writeDatabase = (database) => {
    fs.writeFileSync(resolve("./database.json"), JSON.stringify(database, null, 2) + "\n");

};

module.exports = {readDatabaseMiddleware, writeDatabase};

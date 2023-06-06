const fs = require("fs");
const resolve = require("path").resolve;

const readDatabase = (req, res, next) => {
    const readFile = fs.readFileSync(resolve("./database.json"), "utf-8");
    req.database = JSON.parse(readFile);
    next();
};

module.exports = readDatabase;
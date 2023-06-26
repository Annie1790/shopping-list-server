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

const filterByStatus = (arr, state) => {
    let result = arr.filter((item) => {
        return item.is_completed == state
    });
    return result;
};

const convertDatabaseRows = (arr) => {
    let result = arr.map((object) => {
        return {
            id: object.id,
            name: object.name,
            isCompleted: object.is_completed == 1 ? true : false
        }
    });
    return result;
};

module.exports = { readDatabaseMiddleware, writeDatabase, filterByStatus, convertDatabaseRows };

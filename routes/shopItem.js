const express = require("express");
const fs = require("fs");
const resolve = require("path").resolve;

const readDatabase = require("../utility.js");

shopItemRouter = express.Router();

shopItemRouter.use(readDatabase);

shopItemRouter.post("/", (req, res, next) => {
    try {
        if ("isCompleted" in req.body === false) {
            req.body.isCompleted = false;
        }
        if (typeof (req.body.name) === "string" && typeof (req.body.isCompleted) === "boolean") {
            req.body.id = req.database.nextId;
            req.database.nextId += 1;
            req.database.shopItems.push(req.body);
            fs.writeFileSync(resolve("./database.json"), JSON.stringify(req.database, null, 2) + "\n");
            res.json(`${req.method} success`);
            res.status(201).send();
        } else {
            res.status(405).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

shopItemRouter.put("/", (req, res, next) => {

});

module.exports = shopItemRouter;

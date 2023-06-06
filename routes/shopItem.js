const express = require("express");
const utility = require("../utility.js");

shopItemRouter = express.Router();

shopItemRouter.use(utility.readDatabaseMiddleware);

shopItemRouter.post("/", (req, res, next) => {
    try {
        if ("isCompleted" in req.body === false) {
            req.body.isCompleted = false;
        }
        if (typeof (req.body.name) === "string" && typeof (req.body.isCompleted) === "boolean") {
            req.body.id = req.database.nextId;
            req.database.nextId += 1;
            req.database.shopItems.push(req.body);
            utility.writeDatabase(req.database);
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

const express = require("express");
const utility = require("../utility.js");
const db = require("../server.js");

shopItemRouter = express.Router();

shopItemRouter.use(utility.readDatabaseMiddleware);

shopItemRouter.post("/", (req, res, next) => {
    try {
        if ("isCompleted" in req.body === false) {
            req.body.isCompleted = false;
        }
        if ((typeof req.body.name) === "string" && (typeof req.body.isCompleted) === "boolean") {
            db.run("INSERT INTO grocery_list (name) VALUES(?)", [`${req.body.name}`]);
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
    try {
        if ("isCompleted" in req.body === false) {
            req.body.isCompleted = false;
        }
        if ((typeof req.body.name) !== "string" || (typeof req.body.isCompleted) !== "boolean" || (typeof req.body.id) != "number") {
            res.status(400).send();
            return;
        }
            db.run("UPDATE grocery_list SET name=$name WHERE id=$id", {
                $name: req.body.name,
                $id: req.body.id
            })
            res.status(200).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

module.exports = shopItemRouter;

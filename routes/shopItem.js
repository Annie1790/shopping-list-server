const express = require("express");
const utility = require("../utility.js");
const db = require("../server.js");

shopItemRouter = express.Router();

shopItemRouter.post("/", (req, res, next) => {
    try {
        if ("isCompleted" in req.body === false) {
            req.body.isCompleted = false;
        }
        if ((typeof req.body.name) === "string" && (typeof req.body.isCompleted) === "boolean") {
            db.run("INSERT INTO grocery_list (name, is_completed) VALUES(?, ?)",
                [req.body.name, req.body.isCompleted],
                function (err) {
                    if (err) {
                        res.status(405).send();
                    } else {
                        res.status(201).send();
                    }
                });
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
        db.run("UPDATE grocery_list SET name=$name, is_completed=$is_completed WHERE id=$id", {
            $name: req.body.name,
            $is_completed: req.body.isCompleted,
            $id: req.body.id
        }, function (err) {
            if (this.changes === 0) {
                console.log(err);
                res.status(404).send();
            } else {
                res.status(200).send();
            }
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

module.exports = shopItemRouter;

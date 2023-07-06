const express = require("express");
const sql = require("../database/database.js");

shopItemRouter = express.Router();

shopItemRouter.post("/", (req, res, next) => {
    const result = async (name, is_completed) => {
        const data = await sql`
        INSERT INTO grocery_list (grocery_name, is_completed) VALUES (${name}, ${is_completed})
        `
        return data;
    };    

    if ("is_completed" in req.body === false) {
        req.body.isCompleted = false;
    }
    if ((typeof req.body.name) === "string" && (typeof req.body.is_completed) === "boolean") {
        result(req.body.name, req.body.is_completed)
            .then(() => {
                res.status(201).send();
            },
                (reason) => {
                    console.log(reason);
                    res.status(500).send();
                }
            )
    } else {
        res.status(405).send();
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
            if (err) {
                console.log(err);
                res.status(500).send();
            }
            else if (this.changes === 0) {
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

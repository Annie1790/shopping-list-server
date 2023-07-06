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
    const result = async () => {
        const data = await sql`
        UPDATE grocery_list 
        SET grocery_name=${req.body.grocery_name}, is_completed=${req.body.is_completed} 
        WHERE grocery_id=${req.body.grocery_id}
        `
        return data;
    };

    if ("is_completed" in req.body === false) {
        req.body.is_completed = false;
    }
    if ((typeof req.body.grocery_name) !== "string" || (typeof req.body.is_completed) !== "boolean" || (typeof req.body.grocery_id) != "number") {
        res.status(400).send();
        return;
    }
    result().then(() => {
        res.status(204).send();
    },
    (reason) => {
        console.log(reason);
        res.status(500).send();
    })
});

module.exports = shopItemRouter;

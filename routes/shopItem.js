const express = require("express");
const sql = require("../database/database.js");

const shopItemRouter = express.Router();

shopItemRouter.post("/", async (req, res, next) => {
    const result = async (name, is_completed) => {
        return await sql`
        INSERT INTO grocery_list (grocery_name, is_completed) VALUES (${name}, ${is_completed})
        `
    };

    if ("is_completed" in req.body === false) {
        req.body.isCompleted = false;
    }
    if ((typeof req.body.name) === "string" && (typeof req.body.is_completed) === "boolean") {
        try {
            await result(req.body.name, req.body.is_completed);
            res.status(201).send();
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } else {
        res.status(405).send();
    }
});

shopItemRouter.put("/", async (req, res, next) => {
    const result = async (id) => {
        return await sql`
        UPDATE grocery_list 
        SET grocery_name=${req.body.grocery_name}, is_completed=${req.body.is_completed} 
        WHERE grocery_id=${id}
        `
    };

    if ("is_completed" in req.body === false) {
        req.body.is_completed = false;
    };
    if ((typeof req.body.grocery_name) == "string" || (typeof req.body.is_completed) == "boolean" || (typeof req.body.grocery_id) == "number") {
        try {
            const data = await result(req.body.grocery_id);
            if (data.count === 0) {
                res.status(404).send();
            } else {
                res.status(204).send();
            }
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } else {
        res.status(405).send();
    };
});

module.exports = shopItemRouter;

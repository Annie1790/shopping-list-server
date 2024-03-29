const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const findStatusRouter = express.Router();

const sendResults = (res, value) => {
    utility.convertDatabaseRows(value);
    res.status(200);
    res.send(value);
};

findStatusRouter.get("/", async (req, res, next) => {
    const resultBoolean = async (status) => {
        return await sql`
        SELECT 
        * 
        FROM 
        sorted_groceries_with_tags AS g
        WHERE g.is_completed = ${status}
        `
    };

    const resultAll = async () => {
        return await sql`
        SELECT 
        *
        FROM
        sorted_groceries_with_tags`
    }

    let isCompleted = req.query.is_completed || "";

    if (isCompleted === "true") {
        try {
            let data = await resultBoolean(true);
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } else if (isCompleted === "false") {
        try {
            let data = await resultBoolean(false);
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } else {
        try {
            let data = await resultAll();
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
});

module.exports = findStatusRouter;

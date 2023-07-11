const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const findStatusRouter = express.Router();

const sendResults = (res, value) => {
    utility.convertDatabaseRows(value);
    res.status(200);
    res.send(value);
};
//bug
findStatusRouter.get("/", async (req, res, next) => {
    const result = async (status) => {
        return await sql`
        SELECT 
        * 
        FROM 
        get_all_grocery_tag_junction_all AS g
        WHERE g.is_completed = ${status}
        `
    };

    let isCompleted = req.query.is_completed || "";

    if (isCompleted === "true") {
        try {
            let data = await result(true);
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } else if (isCompleted === "false") {
        try {
            let data = await result(false);
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } else {
        try {
            let data = await result("");
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
});

module.exports = findStatusRouter;

const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const findStatusRouter = express.Router();

const sendResults = (res, value) => {
    utility.changeNullToEmptyArr(value);
    res.status(200);
    res.send(value);
};

findStatusRouter.get("/", (req, res, next) => {
    //query
    const result = async (isCompletedStatus) => {
        const data = await sql`
    WITH grocery_with_tags AS (
        SELECT g.grocery_id, MIN(t.tag_rank) as min_rank, json_agg(t) AS tags_json
        FROM grocery_list AS g
        LEFT JOIN grocery_tags_junction AS gt ON g.grocery_id = gt.grocery_id
        LEFT JOIN tag_list AS t ON t.tag_id = gt.tag_id
        GROUP BY g.grocery_id
    )
    SELECT g.grocery_id, g.grocery_name, g.is_completed, gwt.min_rank, gwt.tags_json
    FROM grocery_list AS g
    LEFT JOIN grocery_with_tags AS gwt ON g.grocery_id = gwt.grocery_id
    WHERE g.is_completed = ${isCompletedStatus}
    ORDER BY gwt.min_rank ASC
    `
        return data;
    };
    //
    let isCompleted = req.query.is_completed || "";

    if (isCompleted === "false") {
        result(false)
            .then((value) => {
                sendResults(res, value);
            },
                (reason) => {
                    console.log(reason);
                    res.status(500).send();
                }
            );
    } else if (isCompleted === "true") {
        result(true)
            .then((value) => {
                sendResults(res, value);
            },
                (reason) => {
                    console.log(reason);
                    res.status(500).send();
                }
            );
    } else {
        result("")
            .then((value) => {
                sendResults(res, value);
            },
                (reason) => {
                    console.log(reason);
                    res.status(500).send();
                }
            );
    }
});

module.exports = findStatusRouter;

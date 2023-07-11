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
    // const getAll = async () => {
    //     await sql`
    //     SELECT 
    //     * 
    //     FROM 
    //     public.get_all_grocery_tag_junction_all
    //     `
    // };

    // const getTrue = async () => {
    //     await sql`
    //     SELECT 
    //     *
    //     FROM
    //     public.get_all_grocery_tag_junction_true
    //     `
    // }

    // const getFalse = async () => {
    //     await sql`
    //     SELECT 
    //     *
    //     FROM
    //     public.get_all_grocery_tag_junction_false
    //     `
    // }

    // console.log(await getAll(), await getTrue(), await getFalse());

    const result = async (isCompletedStatus) => {
        await sql`
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
    };
    //
    let isCompleted = req.query.is_completed || "";
    console.log(isCompleted)

    if (isCompleted === "true") {
        try {
            let data = await result(true);
            console.log(data);
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } else if (isCompleted === "false") {
        try {
            let data = await result(false);
            console.log(data);
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    } else {
        try {
            let data = await result("");
            console.log(data);
            sendResults(res, data);
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
});

module.exports = findStatusRouter;

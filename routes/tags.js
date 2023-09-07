const express = require("express");
const sql = require("../database/database.js");

const tagsRouter = express.Router();

tagsRouter.get("/", async (req, res, next) => {
    const result = async () => {
        return await sql`
        SELECT t.tag_id, t.tag_name, t.tag_rank, t.tag_bg_color, t.tag_text_color
        FROM tag_list AS t
        ORDER BY t.tag_rank ASC
        `
    };

    try {
        const data = await result();
        if (data.length != 0) {
            console.log(`
            Request ${req.method} on ${req.originalUrl} was succesfull
            `)
            res.status(200).send(data);
        } else {
            console.error(`
            Request ${req.method} on ${req.originalUrl} was failed: \n
            data not found
            `)
            res.status(404).send();
        }
    }
    catch (error) {
        console.error(`
        Request ${req.method} on ${req.originalUrl} was failed: \n
        ${error}
        `);
        res.status(500).send();
    }

});

tagsRouter.post("/", async (req, res, next) => {
    req.body.tag_id = Number(req.body.tag_id);
    const result = async (grocery, tag) => {
        return await sql`
        INSERT INTO grocery_tags_junction (grocery_id, tag_id) VALUES (${grocery}, ${tag})
        `
    }
    if ((typeof req.body.grocery_id) === "number" && (typeof req.body.tag_id) === "number") {
        try {
            await result(req.body.grocery_id, req.body.tag_id);
            console.log(`
            Request ${req.method} on ${req.originalUrl} was succesfull
            `)
            res.status(201).send();
        }
        catch (error) {
            console.error(`
            Request ${req.method} on ${req.originalUrl} was failed: \n
            ${error}
            `);
            res.status(500).send();
        }
    } else {
        console.error(`
        Request ${req.method} on ${req.originalUrl} was failed: \n
        Bad request
        `);
        res.status(400).send();
    }
});

tagsRouter.delete("/", async (req, res, next) => {
    const result = async (grocery, tag) => {
        return await sql`
        DELETE FROM grocery_tags_junction AS gt 
        WHERE gt.grocery_id=${grocery}
        AND gt.tag_id=${tag}
        `
    }
    req.body.grocery_id = Number(req.body.grocery_id);
    req.body.tag_id = Number(req.body.tag_id);
    if (!isNaN(req.body.grocery_id) && !isNaN(req.body.tag_id)) {
        try {
            await result(req.body.grocery_id, req.body.tag_id);
            console.log(`
            Request ${req.method} on ${req.originalUrl} was succesfull
            `)
            res.status(204).send();
        }
        catch(error) {
            console.error(`
            Request ${req.method} on ${req.originalUrl} was failed: \n
            ${error}
            `);
            res.status(500).send();
        }
    } else {
        console.error(`
        Request ${req.method} on ${req.originalUrl} was failed: \n
        Bad request
        `);
        res.status(400).send();
    }
});

module.exports = tagsRouter;

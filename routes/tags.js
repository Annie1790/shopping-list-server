const express = require("express");
const sql = require("../database/database.js");

const tagsRouter = express.Router();

tagsRouter.get("/", (req, res, next) => {
    const result = async () => {
        const data = await sql`
        SELECT t.tag_id, t.tag_name, t.tag_rank, t.tag_bg_color, t.tag_text_color
        FROM tag_list AS t
        `

        return data;
    }

    result()
        .then((value) => {
            res.status(200).send(value)
        },
            (reason) => {
                console.log(reason);
                res.status(500).send();
            }
        )
})

tagsRouter.post("/", (req, res, next) => {
    req.body.tag_id = Number(req.body.tag_id);
    const result = async (grocery, tag) => {
        const data = await sql`
        INSERT INTO grocery_tags_junction (grocery_id, tag_id) VALUES (${grocery}, ${tag})
        `
        return data;
    }
    if ((typeof req.body.grocery_id) === "number" && (typeof req.body.tag_id) === "number") {
        result(req.body.grocery_id, req.body.tag_id)
            .then(() => {
                res.status(201).send();
            }, (reason) => {
                console.log(reason);
                res.status(500).send();
            })
    } else {
        res.status(405).send();
    }
});

tagsRouter.delete("/", (req, res, next) => {
    const result = async (grocery, tag) => {
        const data = await sql`
        DELETE FROM grocery_tags_junction AS gt 
        WHERE gt.grocery_id=${grocery}
        AND gt.tag_id=${tag}
        `
        return data;
    }
    req.body.grocery_id = Number(req.body.grocery_id);
    req.body.tag_id = Number(req.body.tag_id);
    if (!isNaN(req.body.grocery_id) && !isNaN(req.body.tag_id)) {
        result(req.body.grocery_id, req.body.tag_id)
            .then(() => {
                if (!req.body.grocery_id || !req.body.tag_id) {
                    res.status(404).send();
                } else {
                    res.status(204).send();
                }
            },
                (reason) => {
                    console.log(reason);
                    res.status(500).send();
                })
    } else {
        res.status(400).send();
    }
});


tagsRouter.put("/", (req, res, next) => {

});

module.exports = tagsRouter;

const express = require("express");
const sql = require("../database/database.js");

const shopItemById = express.Router({ mergeParams: true });

const result = async (id) => {
    const data = await sql`
    DELETE FROM grocery_list AS g WHERE g.grocery_id = ${id}
    `
    return data;
};

shopItemById.delete("/", (req, res, next) => {
    req.params.id = Number(req.params.id);
    if (!isNaN(req.params.id)) {
        result(req.params.id)
            .then(() => {
                if (!req.params.id) {
                    res.status(404).send();
                } else {
                    res.status(204).send();
                }
            },
                (reason) => {
                    console.log(reason);
                    res.status(500).send();
                }
            );
    } else {
        res.status(400).send();
    }
});

shopItemById.put("/", (req, res, next) => {
});

module.exports = shopItemById;

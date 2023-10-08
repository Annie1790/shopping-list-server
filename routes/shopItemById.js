const express = require("express");
const sql = require("../database/database.js");

const shopItemById = express.Router({ mergeParams: true });

shopItemById.delete("/", async (req, res, next) => {
    const result = async (id) => {
        return await sql`
    DELETE FROM grocery_list AS g WHERE g.grocery_id = ${id}
    `
    };
    req.params.id = Number(req.params.id);
    if (!isNaN(req.params.id)) {
        try {
            const data = await result(req.params.id);
            if (data.count === 0) {
                console.error(`
            Request ${req.method} on ${req.originalUrl} was failed: \n
            requested id not found
            `)
                res.status(404).send();
            } else {
                console.log(`
            Request ${req.method} on ${req.originalUrl} was succesfull
            `)
                res.status(204).send();
            }
        }
        catch (error) {
            console.error(`
            Request ${req.method} on ${req.originalUrl} was failed: \n
            ${error}
            `);
            res.status(500).send();
        }
    }
});

module.exports = shopItemById;

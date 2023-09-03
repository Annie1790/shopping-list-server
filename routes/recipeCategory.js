const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const recipeCategory = express.Router();
//all
recipeCategory.get("/all", async (req, res, next) => {
    const result = async () => {
        return await sql`
        SELECT c.category_id, c.category_name 
        FROM recipe_category AS c
        ORDER BY c.category_id ASC
        `
    };

    try {
        const data = await result();
        if (data.length != 0) {
            res.status(200).send(data);
        } else {
            res.status(404).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
})

module.exports = recipeCategory;

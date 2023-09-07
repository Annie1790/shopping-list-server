const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const recipes = express.Router({ mergeParams: true });

recipes.get("/", async (req, res, next) => {
    const getRecipeId = async (id) => {
        return await sql`
        SELECT ingredient_id
        FROM recipe_ingredient_junction
        WHERE recipe_id = ${id}
        `
    }

    const getIngredients = async (id) => {
        return await sql`
        SELECT  *
        FROM recipe_ingredient
        WHERE ingredient_id in (
            SELECT ingredient_id
        FROM recipe_ingredient_junction
        WHERE recipe_id = ${id}); 
        `
    }

    let receivedId = req.params.id;

    res.status(201).send((await getIngredients(receivedId)));

});

module.exports = recipes;
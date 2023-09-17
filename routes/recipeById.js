const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const recipes = express.Router({ mergeParams: true });

recipes.get("/", async (req, res, next) => {

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

    let receivedId = Number(req.params.id);

    res.status(201).send((await getIngredients(receivedId)));

});

recipes.delete("/", async (req, res, next) => {
    let receivedId = Number(req.params.id);

    const deleteRecipe = async (id) => {
        return await sql`
        DELETE FROM recipe_list AS r WHERE r.recipe_id = ${id}
        `
    };

    const deleteIngredients = async (id) => {
        return await sql`
        DELETE FROM recipe_ingredient AS r WHERE r.ingredient_id in (
            SELECT ingredient_id
            FROM recipe_ingredient_junction
            WHERE recipe_id = ${id}
        )
        `
    }
    if (!isNaN(receivedId)) {
        try {
            await deleteIngredients(receivedId);
            const delRec = await deleteRecipe(receivedId);
            if (delRec.count === 0) {
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
    } else {
        console.error(`
            Request ${req.method} on ${req.originalUrl} was failed: \n
            Bad number
            `);
            res.status(400).send();
    }
})

module.exports = recipes;
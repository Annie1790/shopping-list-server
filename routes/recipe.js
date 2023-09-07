const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const recipes = express.Router();

recipes.post("/", async (req, res, next) => {

    const insertToRecipeList = async (name, description, categoryId) => {
        return await sql`
        INSERT INTO recipe_list 
        (recipe_name, recipe_description, recipe_category, recipe_is_favorite)
        VALUES (${name}, ${description}, ${categoryId}, false)
        RETURNING recipe_id
        `
    }

    const insertToRecipeIngredients = async () => {
        let ingrArr = utility.convertIngredientsObjToArr(req.body.recipe_ingredients);
        return await sql`
        INSERT INTO recipe_ingredient
        (ingredient_name, ingredient_category)
        VALUES ${sql(ingrArr)}
        RETURNING ingredient_id
        `
    }

    const insertToRecipeIngredientJunction = async (junctionValues) => {
        return await sql`
        INSERT INTO recipe_ingredient_junction
        (recipe_id, ingredient_id)
        VALUES ${sql(junctionValues)}
        `
    }

    let recipe_category = Number(req.body.recipe_category);

    if ((typeof req.body.recipe_name) === "string" && (typeof req.body.recipe_description) === "string" && (typeof recipe_category) === "number") {
        try {
            const recipeId = await insertToRecipeList(req.body.recipe_name, req.body.recipe_description, req.body.recipe_category);
            const ingredientsIds = await insertToRecipeIngredients();
            await insertToRecipeIngredientJunction(utility.insertIngredientsToJunction(recipeId[0], ingredientsIds));
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
        request body values are not accepted
        `)
        res.status(406).send();
    }


});

recipes.get("/", (req, res, next) => {

})

module.exports = recipes;

const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const recipes = express.Router();

recipes.post("/", async (req, res, next) => {
    //recipe_name must be unique and needs to be put in a try/catch

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

    try {
        const recipeId = await insertToRecipeList(req.body.recipe_name, req.body.recipe_description, req.body.recipe_category);
        const ingredientsIds = await insertToRecipeIngredients();
        await insertToRecipeIngredientJunction(utility.insertIngredientsToJunction(recipeId[0], ingredientsIds));

    }
    catch (error) {
        console.log(error);
    }

});

module.exports = recipes;

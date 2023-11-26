const express = require("express");
const sql = require("../database/database.js");
const mealPlan = express.Router({ mergeParams: true });

// mealPlan.post("/addMeal", async (req, res, next) => {
//     const result = async (ingredientIdArray) => {
//         return await sql`
//         INSERT INTO grocery_list
//         `
//     }

// })

mealPlan.put("/setMealState", async (req, res, next) => {
    const result = async (boolean, id) => {
        return await sql`
        UPDATE recipe_list
        SET recipe_is_in_meal_plan=${boolean}
        WHERE recipe_id=${id}
        `
    }

    if ((typeof req.body.recipe_id == "number") && (typeof req.body.recipe_is_favorite) == "boolean") {
        try {
            const data = await result(req.body.recipe_is_favorite, req.body.recipe_id);
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
        } catch (error) {
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
        res.status(400).send();
    }
})

module.exports = mealPlan;

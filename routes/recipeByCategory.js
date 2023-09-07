const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const recipeByCategory = express.Router({ mergeParams: true });

recipeByCategory.get("/", async (req, res, next) => {

    const returnAll = async () => {
        return await sql`
        SELECT
        *
        FROM
        recipe_list
        `
    };

    const returnFavorites = async () => {
        return await sql`
        SELECT
        *
        FROM
        recipe_list
        WHERE recipe_is_favorite = true
        `
    }

    const returnWithFilter = async (filterId) => {
        return await sql`
        SELECT
        *
        FROM
        recipe_list
        WHERE recipe_category = ${filterId}
        `
    }

    

    let filter = Number(req.params.filter) || String(req.params.filter);

    try {
        switch (filter) {
            case "all":
                res.status(200).send(await returnAll());
                break;
            case "favorites":
                res.status(200).send(await returnFavorites());
                break;
            case 1:
                res.status(200).send(await returnWithFilter(1));
                break;
            case 2:
                res.status(200).send(await returnWithFilter(2));
                break;
            case 3:
                res.status(200).send(await returnWithFilter(3));
                break;
            case 4:
                res.status(200).send(await returnWithFilter(4));
                break;
            case "5":
                res.status(200).send(await returnWithFilter(5));
                break;
            case 6:
                res.status(200).send(await returnWithFilter(6));
                break;
            default:
                res.status(406).send();
        }
    }
    catch (error) {
        res.status(500).send();
    }
})

module.exports = recipeByCategory;

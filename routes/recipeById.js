const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const recipes = express.Router();

recipes.get("/", async (req, res, next) => {
    let receivedId = req.params.id;
    
});

module.exports = recipes;
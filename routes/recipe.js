const express = require("express");
const sql = require("../database/database.js");
const utility = require("../utility.js");

const recipes = express.Router();

recipes.post("/", async (req, res, next) => {

});

module.exports = recipes;

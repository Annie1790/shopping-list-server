const express = require("express");
const sql = require("../database/database.js");
const mealPlan = express.Router({ mergeParams: true });

mealPlan.post("/addMeal", (req, res, next) => {
    console.log(req.body)
})

module.exports = mealPlan;

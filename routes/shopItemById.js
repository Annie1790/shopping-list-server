const express = require("express");

shopItemById = express.Router();

const utility = require("../utility.js");

shopItemById.use(utility.readDatabaseMiddleware);

shopItemById.get("/", (req, res, next) => {

});

shopItemById.post("/", (req, res, next) => {

});

shopItemById.delete("/", (req, res, next) => {

});

shopItemById.put("/", (req, res, next) => {
});

module.exports = shopItemById;

const express = require("express");
const db = require("../server.js");

tagsByIdRouter = express.Router();

tagsByIdRouter.get("/", (req, res, next) => {

});

tagsByIdRouter.delete("/", (req, res, next) => {

})

module.exports = tagsByIdRouter;
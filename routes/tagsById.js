const express = require("express");
const sql = require("../database/database.js");

const tagsByIdRouter = express.Router({ mergeParams: true });

module.exports = tagsByIdRouter;
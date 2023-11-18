const express = require("express");
const sql = require("../database/database.js");

const healthCheckRouter = express.Router();

healthCheckRouter.get("/", async (req, res, next) => {
    try {
        // check if the connection is ok
        const reserved = await sql.reserve()
        reserved.release()

        // send an OK if it is fine
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
})

module.exports = healthCheckRouter;

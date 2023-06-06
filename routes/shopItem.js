const express = require("express");
const fs = require("fs");
const resolve = require("path").resolve;
let id = 0;

shopItemRouter = express.Router();

shopItemRouter.post("/", (req, res, next) => {
    try {
        if ("isCompleted" in req.body === false) {
            req.body.isCompleted = false;
        };
        id++;
        req.body.id = id;
        fs.writeFileSync(resolve("./database.json"), JSON.stringify(req.body) + "\n", { flag: "a+" });
        res.json(`${req.method} success`);
        res.status(201).send();
    }
    catch (error) {
        console.log(error);
        res.status(405).send();
    }
});

shopItemRouter.put("/", (req, res, next) => {

});

module.exports = shopItemRouter;

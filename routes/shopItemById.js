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
    console.log(req.body);
    if (typeof req.query.id != "number") {
        res.status(400).send();
    }

    const isIdInOurDatabase = req.database.shopItems.findIndex((item) => {
        return item.id === req.query.id;
    })
    if (isIdInOurDatabase !== -1) {
        req.database.shopItems[isIdInOurDatabase].name = req.body.name;
        utility.writeDatabase(req.database);
        res.status(200).send(`${req.method} success`);
    } else {
        res.status(404).send();
    }
});

module.exports = shopItemById;

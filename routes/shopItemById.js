const express = require("express");

shopItemById = express.Router({ mergeParams: true });

const utility = require("../utility.js");

shopItemById.use(utility.readDatabaseMiddleware);

shopItemById.get("/", (req, res, next) => {

});

shopItemById.post("/", (req, res, next) => {

});

shopItemById.delete("/", (req, res, next) => {
    req.params.id = Number(req.params.id);
    if (!isNaN(req.params.id)) {
        const deleteIndex = req.database.shopItems.findIndex((item) => {
            return item.id === req.params.id
        })
        if (deleteIndex !== -1) {
            req.database.shopItems.splice(deleteIndex, 1)
            utility.writeDatabase(req.database);
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } else {
        res.status(400).send();
    }
});

shopItemById.put("/", (req, res, next) => {
});

module.exports = shopItemById;

const express = require("express");
shopItemById = express.Router({ mergeParams: true });
const utility = require("../utility.js");
const db = require("../server.js");

shopItemById.get("/", (req, res, next) => {

});

shopItemById.post("/", (req, res, next) => {

});

shopItemById.delete("/", (req, res, next) => {
    try {
        req.params.id = Number(req.params.id);
        if (!isNaN(req.params.id)) {
            db.run("DELETE FROM grocery_list WHERE id = $id", {
                $id: req.params.id
            }, function(err) {
                if (err) {
                    console.log(err);
                    res.status(404).send();
                } else {
                    res.status(204).send();
                }
            });
        } else {
            res.status(400).send();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

shopItemById.put("/", (req, res, next) => {
});

module.exports = shopItemById;

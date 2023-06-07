const express = require("express");
const utility = require("../utility.js");

findStatusRouter = express.Router();

findStatusRouter.use(utility.readDatabaseMiddleware);

findStatusRouter.get("/", (req, res, next) => {
    const isCompleted = req.query.isCompleted || "";
    let groceryArray = req.database.shopItems;
    if (isCompleted === "true" || isCompleted === "false" || isCompleted === "") {
        if (isCompleted === "true") {
            groceryArray = utility.filterByStatus(groceryArray, true)
        } else if (isCompleted === "false") {
            groceryArray = utility.filterByStatus(groceryArray, false)
        }
        res.status(200);
        res.send(groceryArray);
    } else {
        res.status(400).send();
    }

});

module.exports = findStatusRouter;

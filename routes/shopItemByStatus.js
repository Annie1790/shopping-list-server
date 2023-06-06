const express = require("express");
const utility = require("../utility.js");

findStatusRouter = express.Router();

findStatusRouter.use(utility.readDatabaseMiddleware);

findStatusRouter.get("/", (req, res, next) => {
    const isQuery = req.query.isCompleted || "";
    let groceryArray = req.database.shopItems;
    if (isQuery === "true" || isQuery === "false" || isQuery === "") {
        if (isQuery === "true") {
            groceryArray = utility.filterArr(groceryArray, true)
        } else if (isQuery === "false") {
            groceryArray = utility.filterArr(groceryArray, false)
        };
        res.status(200);
        res.send(groceryArray);
    } else {
        res.status(400).send();
    }

});

module.exports = findStatusRouter;

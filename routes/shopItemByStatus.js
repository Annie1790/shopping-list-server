const express = require("express");
const utility = require("../utility.js");
const db = require("../server.js");

findStatusRouter = express.Router();

findStatusRouter.use(utility.readDatabaseMiddleware);

//The original code
// findStatusRouter.get("/", (req, res, next) => {
//     const isCompleted = req.query.isCompleted || "";
//     let groceryArray = req.database.shopItems;
//     if (isCompleted === "true" || isCompleted === "false" || isCompleted === "") {
//         if (isCompleted === "true") {
//             groceryArray = utility.filterByStatus(groceryArray, true)
//         } else if (isCompleted === "false") {
//             groceryArray = utility.filterByStatus(groceryArray, false)
//         }
//         res.status(200);
//         res.send(groceryArray);
//     } else {
//         res.status(400).send();
//     }

// });

//My solution with sqlite
findStatusRouter.get("/", (req, res, next) => {
    db.all("SELECT rowid, * FROM grocery_list", (err, row) => {
        if (err) {
            throw err
        } else {
            const isCompleted = req.query.isCompleted || "";
            if (isCompleted === "true" || isCompleted === "false" || isCompleted === "") {
                if (isCompleted === "true") {
                    row = utility.filterByStatus(row, Number(1))
                } else if (isCompleted === "false") {
                    row = utility.filterByStatus(row, Number(0))
                }
                res.status(200);
                res.send(row);
            } else {
                res.status(400).send();
            }
        }
    });


})

module.exports = findStatusRouter;

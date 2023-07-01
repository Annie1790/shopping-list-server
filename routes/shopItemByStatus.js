const express = require("express");
const utility = require("../utility.js");
const db = require("../server.js");

findStatusRouter = express.Router();

findStatusRouter.get("/", (req, res, next) => {
    let isCompleted = req.query.isCompleted || "";
    if (isCompleted === "true" || isCompleted === "false") {
        //Must be converted to boolean in order to use db.all clause
        isCompleted = isCompleted == "true";
        db.all("SELECT grocery_list.id, grocery_list.name, grocery_list.is_completed, tag_list.id AS `tag_id`, tag_list.tag_name, tag_list.color FROM grocery_list LEFT JOIN tag_list ON grocery_list.id = tag_list.grocery_list_id WHERE grocery_list.is_completed=$is_completed", {
            $is_completed: isCompleted
        },
            (err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                    return;
                } else {
                    let result = utility.fullShopItemFromRows(rows);
                    res.status(200);
                    res.send(result);
                }
            })
    } else if (isCompleted === "") {
        db.all("SELECT id, name, is_completed FROM grocery_list",
            (err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                    return;
                } else {
                    rows = utility.fullShopItemFromRows(rows);
                    res.status(200);
                    res.send(rows);
                }
            })
    } else {
        res.status(400).send();
    }
})

module.exports = findStatusRouter;

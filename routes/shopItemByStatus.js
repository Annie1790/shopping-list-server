const express = require("express");
const utility = require("../utility.js");
const db = require("../server.js");

findStatusRouter = express.Router();

findStatusRouter.get("/", (req, res, next) => {
    let isCompleted = req.query.isCompleted || "";
    if (isCompleted === "true" || isCompleted === "false") {
        //Must be converted to boolean in order to use db.all clause
        isCompleted = isCompleted == "true";
        db.all("SELECT id, name, is_completed FROM grocery_list WHERE is_completed=?", [isCompleted],
            (err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                    return;
                } else {
                    rows = utility.convertDatabaseRows(rows);
                    res.status(200);
                    res.send(rows);
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
                    rows = utility.convertDatabaseRows(rows);
                    res.status(200);
                    res.send(rows);
                }
            })
    } else {
        res.status(400).send();
    }
})

module.exports = findStatusRouter;

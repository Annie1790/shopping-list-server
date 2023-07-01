const express = require("express");
const db = require("../server.js");

tagsRouter = express.Router();
//post new tag
tagsRouter.post("/", (req, res, next) => {
    try {
        if ((typeof req.body.id) === "number" && (typeof req.body.tag_name) === "string" && (typeof req.body.color) === "string") {
            db.run("INSERT INTO tag_list (grocery_list_id, tag_name, color) VALUES(?,?,?)",
                [req.body.id, `#${req.body.tag_name}`, req.body.color],
                function (err) {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    } else {
                        res.status(201).send();
                    }
                }
            );
        } else {
            res.status(405).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
//update tag name
tagsRouter.put("/", (req, res, next) => {

});

module.exports = tagsRouter;
const express = require("express");
const fs = require("fs");
const resolve = require("path").resolve;
let id = 0;

shopItemRouter = express.Router();

shopItemRouter.use("/", (req,res,next) => {
id++;
req.body.id = id;
next();
})

shopItemRouter.post("/", (req, res, next) => {
    res.json(`${req.method} success`);
    console.log(req.body);
    fs.writeFileSync(resolve("./database.json"), JSON.stringify(req.body) + "\n", { flag: "a+" }, error => { console.log(error) })
});

shopItemRouter.put("/", (req, res, next) => {

});

module.exports = shopItemRouter;
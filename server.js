const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const sqlite = require("sqlite3");

let db = new sqlite.Database("../shopping-list-database/database.sqlite", err => {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Database connected");
    }
});
//Already runned, table exist
// db.run("CREATE TABLE grocery_items (name, isCompleted, id)");

// const firstQuery = `INSERT INTO grocery_items (name TEXT, isCompleted, id)
//         VALUES(?, ?, NULL)`
// db.run(firstQuery,["bread", false])

module.exports = db;

app.use(cors());
app.use(express.json());

const findStatusRouter = require("./routes/shopItemByStatus.js");
app.use("/shopItem/findByStatus", findStatusRouter);

const shopItemById = require("./routes/shopItemById.js");
app.use("/shopItem/:id", shopItemById);

const shopItemRouter = require("./routes/shopItem.js");
app.use("/shopItem", shopItemRouter);

app.use((req,res,next) => {
    console.log(req.get("user-agent"));
    next();
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

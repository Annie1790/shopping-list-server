const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const sqlite = require("sqlite3");
const exit = require("process");

let db = new sqlite.Database("./database/database.sqlite", err => {
    if (err) {
        console.log(err);
        exit(-1);
    } else {
        console.log("Database connected");
        db.run("CREATE TABLE IF NOT EXISTS grocery_list (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, is_completed BOOLEAN DEFAULT false)");
        db.run("CREATE TABLE IF NOT EXISTS tag_list (id INTEGER NOT NULL, tag_name TEXT, tag_id INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT)");
    }
});

module.exports = db;

app.use(cors());
app.use(express.json());

const tagsByIdRouter = require("./routes/tagsById.js");
app.use("/tags/:id", tagsByIdRouter);

const tagsRouter = require("./routes/tags.js");
app.use("/tags", tagsRouter);

const findStatusRouter = require("./routes/shopItemByStatus.js");
app.use("/shopItem/findByStatus", findStatusRouter);

const shopItemById = require("./routes/shopItemById.js");
app.use("/shopItem/:id", shopItemById);

const shopItemRouter = require("./routes/shopItem.js");
app.use("/shopItem", shopItemRouter);

app.use((req, res, next) => {
    console.log(req.get("user-agent"));
    next();
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

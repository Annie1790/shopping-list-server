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
        db.run("CREATE TABLE IF NOT EXISTS grocery_list (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, is_completed BOOLEAN NOT NULL DEFAULT false)");
        db.run("CREATE TABLE IF NOT EXISTS tag_list (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, rank REAL NOT NULL, tag_color TEXT)");
        // db.run("CREATE TABLE IF NOT EXISTS grocery_and_tag (grocery_id INTEGER NOT NULL, tag_id INTEGER NOT NULL, PRIMARY KEY (grocery_id, tag_id), FOREIGN KEY (grocery_id) REFERENCES grocery_list (id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (tag_id) REFERENCES tag_list (id) ON DELETE CASCADE ON UPDATE CASCADE)");
    }
});

module.exports = db;

app.use(cors());
app.use(express.json());

const tagsByIdRouter = require("./routes/tagsById.js");
app.use("/shopItem/:grocery/tags/:tag", tagsByIdRouter);

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

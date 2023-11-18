const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;

const prefix = process.env.URL_PREFIX || "";

app.use(cors());
app.use(express.json());

const healthCheckRouter = require("./routes/healthCheck.js");
app.use(`${prefix}/healthCheck`, healthCheckRouter);

const tagsRouter = require("./routes/tags.js");
app.use(`${prefix}/tags`, tagsRouter);

const findStatusRouter = require("./routes/shopItemByStatus.js");
app.use(`${prefix}/shopItem/findByStatus`, findStatusRouter);

const shopItemById = require("./routes/shopItemById.js");
app.use(`${prefix}/shopItem/:id`, shopItemById);

const shopItemRouter = require("./routes/shopItem.js");
app.use(`${prefix}/shopItem`, shopItemRouter);

app.use((req, res, next) => {
    console.log(req.get("user-agent"));
    next();
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

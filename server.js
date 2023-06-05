const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;

app.use(cors());
app.use(express.json());

const shopItemRouter = require("./routes/shopItem.js");
app.use("/shopItem", shopItemRouter);

const shopItemById = require("./routes/shopItemById.js");
app.use("/shopItem/:id", shopItemById);

const findStatusRouter = require("./routes/shopItemByStatus.js");
app.use("/shopItem/findByStatus", findStatusRouter);

app.use((req,res,next) => {
    console.log(req.get("user-agent"));
    next();
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

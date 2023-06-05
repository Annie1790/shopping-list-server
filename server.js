const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;

app.use(cors());
app.use(express.json());

const shopItemRouter = require("./routes/shopItem.js");
app.use("/shopItem", shopItemRouter);

const findIdRouter = require("./routes/findId.js");
app.use("/shopItem/:id", findIdRouter);

const tickStatusRouter = require("./routes/tickStatus.js");
app.use("/shopItem/findByTickStatus", tickStatusRouter);

app.use((req,res,next) => {
    console.log(req.get("user-agent"));
    next();
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
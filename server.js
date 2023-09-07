const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(
        `
        Processing ${req.method} on ${req.originalUrl} : \n
        Request from ${req.get('user-agent')}
    `)
    next();
})

const recipeByCategoryRouter = require("./routes/recipeByCategory.js");
app.use("/recipe/findByCategory/:filter", recipeByCategoryRouter);

const recipesIdRouter = require("./routes/recipeById.js");
app.use("/recipe/:id/ingredients", recipesIdRouter);

const recipesRouter = require("./routes/recipe.js");
app.use("/recipe", recipesRouter);

const recipeCategoryRouter = require("./routes/recipeCategory.js");
app.use("/recipeCategories", recipeCategoryRouter);

const tagsRouter = require("./routes/tags.js");
app.use("/tags", tagsRouter);

const findStatusRouter = require("./routes/shopItemByStatus.js");
app.use("/shopItem/findByStatus", findStatusRouter);

const shopItemById = require("./routes/shopItemById.js");
app.use("/shopItem/:id", shopItemById);

const shopItemRouter = require("./routes/shopItem.js");
app.use("/shopItem", shopItemRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

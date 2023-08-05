const postgres = require("postgres");

const sql = postgres(process.env.DATABASE_URL || process.env.SHOPPING_LIST_DATABASE_URL, {});

module.exports = sql;

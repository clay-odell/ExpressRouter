const express = require("express");
const fakeDb = require("./fakeDb.js");
const middleware = require("./middleware.js");
const morgan = require("morgan");

const app = express();
const routes = require("./routes.js");

app.use(express.json());
app.use("/items", routes);
app.use(morgan("dev"));
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});


module.exports = app;
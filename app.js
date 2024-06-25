const express = require("express");
const fakeDb = require("./fakeDb.js");
const ExpressError = require("./expressError.js");
const middleware = require("./middleware.js");
const morgan = require("morgan");

const app = express();  
const { errorHandler } = require('./middleware.js');
const routes = require("./routes.js");
app.use(morgan("dev"));
app.use(express.json());
app.use("/items", routes);

app.use(errorHandler);


module.exports = app;
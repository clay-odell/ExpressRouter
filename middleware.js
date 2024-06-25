const ExpressError = require("./expressError");

function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Something went wrong";

  if (process.env.NODE_ENV !== "test") {
    console.error(err.stack);
  }
  return res.status(status).json({ error: { message, status } });
}

module.exports = { errorHandler };

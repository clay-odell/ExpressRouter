
const ExpressError = require('./expressError.js');

function errorHandler (err, reeq, res, next) {
    let status = err.status || 500;
    let message = err.message || "Something went wrong";

    if(process.env.NODE_ENV !== 'test') {
        console.err(err.stack);
    }
    return res.status(status).json({ error: {message, status}});
}

module.exports = { errorHandler };



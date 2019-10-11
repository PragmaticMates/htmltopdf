const express = require("express");
const logger = require("morgan");
const getRawBody = require('raw-body');
const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(function (req, res, next) {
    getRawBody(req, {
        length: req.headers['content-length'],
        limit: '1mb',
        // encoding: contentType.parse(req).parameters.charset
        encoding: 'utf-8'
    }, function (err, string) {
        if (err) return next(err);
        req.text = string;
        next();
    });
});

app.use("/", indexRouter);

module.exports = app;

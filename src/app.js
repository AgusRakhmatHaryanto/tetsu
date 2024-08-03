const indexRouter = require('./routers/indexRoute');

const express = require('express');
const app = express();
const morgan = require('morgan');
const {API_URL} = require('./config/env')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(`/${API_URL}`, indexRouter);

module.exports = app;


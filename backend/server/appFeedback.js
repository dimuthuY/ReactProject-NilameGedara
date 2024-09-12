const express = require('express');
const cors = require('cors');
const appFeedback = express();
const routerFeedback = require('./routes/routerFeedback');

appFeedback.use(cors());
appFeedback.use(express.urlencoded({ extended: true }));
appFeedback.use(express.json());

appFeedback.use('/api', routerFeedback);

module.exports = appFeedback;

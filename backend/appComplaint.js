const express = require('express');
const cors = require('cors');
const appComplaint = express();
const routerComplaint = require('./routes/routerComplaint');

appComplaint.use(cors());
appComplaint.use(express.urlencoded({ extended: true }));
appComplaint.use(express.json());

appComplaint.use('/api', routerComplaint);

module.exports = appComplaint;

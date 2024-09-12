const express = require('express');
const router = express.Router();
const controllerFeedback = require('../controller/controllerFeedback');

router.get('/getfeedback', controllerFeedback.getFeedback);
router.post('/createfeedback', controllerFeedback.createFeedback);
router.post('/updatefeedback', controllerFeedback.updateFeedback);
router.post('/deletefeedback', controllerFeedback.deleteFeedback);
router.get('/getmaxid', controllerFeedback.getMaxId);

module.exports = router;

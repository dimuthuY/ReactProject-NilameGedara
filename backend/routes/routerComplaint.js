const express = require('express');
const router = express.Router();
const controllerComplaint = require('../controller/controllerComplaint');

router.get('/getcomplaint', controllerComplaint.getComplaint);
router.post('/createcomplaint', controllerComplaint.createComplaint);
router.post('/updatecomplaint', controllerComplaint.updateComplaint);
router.post('/deletecomplaint', controllerComplaint.deleteComplaint);
router.get('/getmaxid', controllerComplaint.getMaxId);

module.exports = router;

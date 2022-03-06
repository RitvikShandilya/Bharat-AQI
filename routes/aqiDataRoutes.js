const express = require('express');
const router = express.Router();
const aqiDataController = require('../controller/aqiData.controller');

router.post('/', aqiDataController.getAQIData);

module.exports = router;
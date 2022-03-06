const express = require('express');
const router = express.Router();
const stationController = require('../controller/stationController');

router.post('/', stationController.addStation);

// router.get('/:name', stationController.findStationByName);

// router.delete('/:name', stationController.deleteStationByName);

// router.post('/geoSearch', stationController.geoSearchStations);

module.exports = router;
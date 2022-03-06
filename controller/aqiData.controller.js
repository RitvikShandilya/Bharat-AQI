const e = require("express");
const { getPollutantDataDate, getPollutantDataStation } = require("../service/aqiDataService");
const stationService = require("../service/stationService");

module.exports.getAQIData = async (req, res) => {
    const { date, hour, stationName } = req.body;
    // const reqBody = {
    //     date: '22-Jan-2022',
    //     hour: [1,24],
    //     stationName: 'Station Name' // Reference to station name
    // }
    if (!date) {
        /// return 400 Bad Request
        return res.status(400).json({
            message: 'Date parameter is not provided'
        });
    }
    if (stationName) {
        const station = await stationService.findStationByName({name: stationName});
        if (hour) {
            // Particular station AQI data for a particular hour on a given day
            const intHour = +hour;
            console.log('intHour', intHour);
            if (!isNaN(intHour) && intHour > 0 && intHour <=24) {
                const data = await getPollutantDataStation(station._id.toString(), date, intHour);
                res.status(200).json({
                    message: 'Particular station AQI data for a particular hour on a given day',
                    data,
                });
            } else {
                return res.status(400).json({
                    message: 'Hour parameter is not valid'
                });
            }
        } else {
            // Particular station AQI data on a given day
            const data = await getPollutantDataStation(station._id.toString(), date, hour);
            res.status(200).json({
                message: 'Particular station AQI data on a given day',
                data,
            });
        }
    } else {
        if (hour) {
            // All stations AQI data for a particular hour on a given day
            const intHour = +hour;
            console.log('intHour', intHour);
            if (!isNaN(intHour) && intHour > 0 && intHour <=24) {
                const data = await getPollutantDataDate(date, intHour);
                res.status(200).json({
                    message: 'All stations AQI data for a particular hour on a given day',
                    data,
                });
            } else {
                return res.status(400).json({
                    message: 'Hour parameter is not valid'
                });
            }
        } else {
            // All stations AQI data for whole day on a given date
            const data = await getPollutantDataDate(date);
            res.status(200).json({
                message: 'All stations AQI data for whole day on a given date',
                data,
            });
        }
    }
}
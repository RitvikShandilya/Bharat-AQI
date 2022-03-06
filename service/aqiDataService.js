const aqiDataModel = require("../database/models/aqiDataModel")

const addPollutant = (pollutantData) => aqiDataModel.create(pollutantData);


const getPollutantDataDate = (date, hour) => {
    const tzOffsetMS = new Date().getTimezoneOffset() * 60 * 1000;
    let upperBound;
    let lowerBound;
    if (hour) {
        upperBound = new Date(new Date(date).getTime() + hour * 60 * 60 * 1000 - tzOffsetMS);
        lowerBound = new Date(upperBound.getTime() - 1000 * 60 * 60);
    } else {
        lowerBound = new Date(date);
        upperBound = new Date(lowerBound.getTime() + 1000 * 60 * 60 * 24);
    }
    console.log('upperBound', upperBound);
    console.log('lowerBound', lowerBound);
    return aqiDataModel.find({
        createdAt: {
            $gte: lowerBound,
            $lt: upperBound
        },
    });
}

const getPollutantDataStation = (stationId, date, hour) => {
    const tzOffsetMS = new Date().getTimezoneOffset() * 60 * 1000;
    let upperBound;
    let lowerBound;
    if (hour) {
        upperBound = new Date(new Date(date).getTime() + hour * 60 * 60 * 1000 - tzOffsetMS);
        lowerBound = new Date(upperBound.getTime() - 1000 * 60 * 60);
    } else {
        lowerBound = new Date(date);
        upperBound = new Date(lowerBound.getTime() + 1000 * 60 * 60 * 24);
    }
    console.log('upperBound', upperBound);
    console.log('lowerBound', lowerBound);
    return aqiDataModel.find({
        station: stationId,
        createdAt: {
            $gte: lowerBound,
            $lt: upperBound
        },
    });
}

module.exports = { addPollutant, getPollutantDataDate, getPollutantDataStation };

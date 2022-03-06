const { addStation, findStationByName } = require("../service/stationService");
const { addPollutant } = require("../service/aqiDataService");

module.exports.addStation = async (req, res)=>{
    try {
        const { name, cityName, stateName, aqiData} = req.body;
        if(!name || !cityName || !stateName || !aqiData) return res.status(400).json({
            message: 'Station data provided has invalid fields',
        });
        // if(!location.type || !location.coordinates) return res.status(400).json({
        //     message: 'Location data provided has invalid fields'
        // });
        let station = await findStationByName({name})
        console.log('find Station By Name', station);
        if (!station) {
            station = await addStation({name, cityName, stateName,});
        }
        const stationId = station._id;
        const { pollutants } = aqiData;
        const addedPollutants = await Promise.allSettled(Object.entries(pollutants).map(([name, pollutant]) => {
            console.log(pollutant);
            const predominantParameter = aqiData["Air_Quality_Index"] && aqiData["Air_Quality_Index"]["Predominant_Parameter"];
            const pollutionData = {
                station: stationId,
                name,
                avg: +pollutant["Avg"] || -1,
                max: +pollutant["Max"] || -1,
                min: +pollutant["Min"] || -1,
                isPredominant: predominantParameter && name === aqiData["Air_Quality_Index"]["Predominant_Parameter"],
                // 
                createdAt: new Date(Date.now() - 1000 * 60 * 60 - ((new Date()).getMinutes() * 60 * 1000) - (new Date()).getSeconds() * 1000),
            };
            return addPollutant(pollutionData);
        }));
        console.log('addedPollutants', addedPollutants);
        station.addedPollutants = addedPollutants;
        return res.status(200).json({
            data: station,
            message: 'Station added successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong!! Station could not be added'
        });
    }
}

// module.exports.deleteStationByName = async (req, res) => {
//     try {
//         const name = req.parms.name;
//         const isDeleted = await deleteStationByName(name);
//         return res.status(200).json({
//             message: !!isDeleted ? 'Station deleted successfully': 'No station was found of name ' + name
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Something went wrong!! Station could not be delete'
//         });
//     }
// }

// module.exports.findStationByName = async data => {
//     try {
//         const { name } = data;
//         const station = await StationModel.findOne({
//             name
//         })
//         return station;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// module.exports.geoSearchStations = async data => {
//     try {
//         const { boundingGeom } = data;
//         const stations = await StationModel.find({
//             location: {
//                 $geoWithin: {
//                     $geometry: boundingGeom
//                 }
//             }
//         })
//         return stations;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

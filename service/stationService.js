const StationModel = require("../database/models/stationModel")

module.exports.addStation = (data) => {
    const station = new StationModel(data);
    return station.save();
}

module.exports.addManyStations = async (data) => {
    const { stations } = data;
    const bWArr = stations.map(st => {
        return {
            insertOne: {
                document: {
                    ...st
                }
            }
        }
    })
    console.log('bWArr Length: ',bWArr.length);
    return StationModel.bulkWrite(bWArr);
}

// module.exports.deleteStationByName = async (data) => {
//     try {
//         const { name } = data;
//         const result = await StationModel.remove({
//             name
//         })
//         return result.deletedCount;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

module.exports.findStationByName = async data => {
    try {
        const { name } = data;
        const station = await StationModel.findOne({
            name
        })
        return station;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

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

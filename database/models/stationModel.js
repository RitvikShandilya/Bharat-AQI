const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    stateName: {
        type: String,
        required: true
    },
    // location: {
        // type: {
            // type: {
                // type: String, // Don't do `{ location: { type: String } }`
                // enum: ['Point'], // 'location.type' must be 'Point'
                // required: true
            // },
            // coordinates: {
                // type: [Number],
                // required: true
            // },
        // },
        // // required: true,
        // index: '2dsphere'
    // }
}, { timestamps: true });

// stationSchema.index('location', '2dsphere');

module.exports = mongoose.model('Station', stationSchema);
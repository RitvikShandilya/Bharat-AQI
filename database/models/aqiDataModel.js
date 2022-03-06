const mongoose = require('mongoose');

const aqiDataSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    avg: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    max: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    min: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    isPredominant: {
        type: mongoose.Schema.Types.Boolean,
        default: true,
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    
}, { timestamps: false });


module.exports = mongoose.model('AQIData', aqiDataSchema);
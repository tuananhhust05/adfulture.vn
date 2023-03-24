const mongoose = require("mongoose");
const HistoryAccessSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            default: 0,
        },
        month: {
            type: Number,
            default: 0,
        },
        year: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 0,
        },
        
    },
    {
        collection: 'HistoryAccesss',
        versionKey: false,
        timestamp:true
    },
);

module.exports = mongoose.model('HistoryAccess', HistoryAccessSchema)
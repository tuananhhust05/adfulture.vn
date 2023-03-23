const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: ""
        },
        read:{
            type:Number,
            default:0
        }
    },
    {
        collection: 'Customers',
        versionKey: false,
    },
);

module.exports = mongoose.model('Customer', CustomerSchema)
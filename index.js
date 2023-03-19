const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const expressLayouts = require('express-ejs-layouts')
const router = require('./routes/index.js')
const app = express();

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://Tuananh:Tuananh050901@cluster0.jy3u9ao.mongodb.net/AdFulture");
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
})
//middlewares
app.use(express.json());
app.use(expressLayouts)
app.set('view engine', 'ejs');
// config static file 
app.use(express.static(path.join(__dirname, '/public')));
router(app)
const server = http.createServer(app);

server.listen(9000, () => {
    connect()
    console.log("Server is running on http://localhost:9000")
})

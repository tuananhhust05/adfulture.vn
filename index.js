const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
// const log4js = require('log4js');
const http = require('http');
const {autoUpdatePass}= require('./controllers/admin/auth');
const expressLayouts = require('express-ejs-layouts')
const router = require('./routes/index.js')

const app = express();

// log4js.configure({
//   appenders: { everything: { type: 'file', filename: 'logs.txt' } },
//   categories: { default: { appenders: ['everything'], level: 'ALL' } }
// });
// const logger = log4js.getLogger();

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://Tuananhhust05:Tuananh050901@cluster0.aqpat.mongodb.net/AdFulture?retryWrites=true&w=majority");
        console.log("Connected to mongoDB.");
    } catch (error) {
       // throw error;
      //  logger.debug('mongodb+srv://Tuananhhust05:Tuananh050901@cluster0.aqpat.mongodb.net/AdFulture?retryWrites=true&w=majority');
      //  logger.debug(error);
      console.log(error);
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

app.get('/log', (req, res) => {
  res.sendFile(path.join(__dirname + '/logs.txt'));
});

router(app)
const server = http.createServer(app);

server.listen(9000, () => {
    connect();
    autoUpdatePass();
    console.log("Server is running on http://localhost:9000")
})

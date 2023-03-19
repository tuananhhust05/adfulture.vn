const express = require('express');
const router = express.Router();

const {
    GetDataHomePage,
    GetHistoryReqHomePage,
    GetProductByType
} = require('../../controllers/homepage');
router.get('/GetDataHomePage', GetDataHomePage);
router.get('/GetProductByType/:type', GetProductByType);
router.get('/GetHistoryReqHomePage/Adfulture/vn', GetHistoryReqHomePage);
module.exports = router;
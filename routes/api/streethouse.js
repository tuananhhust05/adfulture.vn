const express = require('express');
const router = express.Router();
const {
    TakeDataStreetHouse
} = require('../../controllers/streethouse');
router.get('/:type', TakeDataStreetHouse);

module.exports = router;
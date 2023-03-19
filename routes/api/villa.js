const express = require('express');
const router = express.Router();
const {
    TakeDataVilla
} = require('../../controllers/villa');
router.get('/:type', TakeDataVilla);

module.exports = router;
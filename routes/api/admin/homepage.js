const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const {
    CreateHomePageElement
} = require('../../../controllers/admin/homepage');
router.post('/CreateHomePageElement', formData.parse(), CreateHomePageElement);
module.exports = router;
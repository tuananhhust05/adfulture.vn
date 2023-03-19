const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const {
    Login,
} = require('../../../controllers/admin/auth');
router.post('/login', formData.parse(), Login);

module.exports = router;
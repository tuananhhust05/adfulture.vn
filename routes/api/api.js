const express = require('express');
const router = express.Router();
const hompageRoute = require('./homepage.js')
const villaRoute = require('./villa.js')
const streetRoute = require('./streethouse')
const adminAuthRoute = require('./admin/auth.js')
const adminHomepageRoute = require('./admin/homepage.js')


router.use('/homepage', hompageRoute)
router.use('/villa', villaRoute)
router.use('/streethouse', streetRoute)
router.use('/admin/auth', adminAuthRoute)
router.use('/admin/homepage', adminHomepageRoute)

module.exports = router;
const express = require('express');
const router = express.Router();
const hompageRoute = require('./homepage.js')
const villaRoute = require('./villa.js')
const streetRoute = require('./streethouse')
const contactRoute = require('./contact.js')
const adminAuthRoute = require('./admin/auth.js')
const adminHomepageRoute = require('./admin/homepage.js')
const adminPriceRoute = require('./admin/price.js')
const adminContactRoute = require('./admin/contact.js')
const fileRoute = require('./admin/file.js')
const { sendMail } = require('../../controllers/sendMail.js')
const formData = require('express-form-data');


router.use('/homepage', hompageRoute)
router.use('/villa', villaRoute)
router.use('/streethouse', streetRoute)
router.use('/contact', contactRoute)
router.use('/admin/auth', adminAuthRoute);
router.use('/admin/file', fileRoute);
router.use('/admin/homepage', adminHomepageRoute)
router.use('/admin/price', adminPriceRoute)
router.use('/admin/contact', adminContactRoute)
router.post('/sendMail', formData.parse(), sendMail)


module.exports = router;
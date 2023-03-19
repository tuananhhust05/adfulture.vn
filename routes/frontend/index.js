const express = require('express')
const formData = require('express-form-data')
const router = express.Router();

router.get('/about', function (req, res) {
    res.render('about', { layout: 'layouts/index' })
})

router.get('/villa/:type', function (req, res) {
    res.render('villa', { layout: 'layouts/index' ,type:req.params.type})
})

router.get('/streethouse/:type', function (req, res) {
    res.render('streethouse', { layout: 'layouts/index' ,type:req.params.type})
})

router.get('/services', function (req, res) {
    res.render('services', { layout: 'layouts/index' })
})

router.get('/contact', function (req, res) {
    res.render('contact', { layout: 'layouts/index' })
})

router.get('/service-single', function (req, res) {
    res.render('service-single', { layout: 'layouts/index' })
})

router.get('/news-right-sidebar', function (req, res) {
    res.render('news-right-sidebar', { layout: 'layouts/index' })
})
router.get('/projects', function (req, res) {
    res.render('projects', { layout: 'layouts/index' })
})

router.get('/project-detail/:id', function (req, res) {
    res.render('project-detail', { layout: 'layouts/index', idProjectDetail: req.params.id })
})

router.get('/pricing', function (req, res) {
    res.render('pricing', { layout: 'layouts/index' })
})

router.get('/', function (req, res) {
    res.render('index', { layout: 'layouts/index' });
});

module.exports = router

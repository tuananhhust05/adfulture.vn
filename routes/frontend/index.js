const express = require('express')
const formData = require('express-form-data');
const fs = require('fs')
const { CreateError } = require('../../utils/error');
const router = express.Router();
const Product = require('../../models/Product.js');
router.get('/about', function (req, res) {
    res.render('about', { layout: 'layouts/index' })
})

router.get('/villa/:type', function (req, res) {
    res.render('villa', { layout: 'layouts/index', type: req.params.type })
})

router.get('/streethouse/:type', function (req, res) {
    res.render('streethouse', { layout: 'layouts/index', type: req.params.type })
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
    // fs.writeFileSync('./utils/pricing.txt', JSON.stringify(a))
    const price = JSON.parse(fs.readFileSync('./utils/pricing.txt', 'utf8'))
    res.render('pricing', { layout: 'layouts/index', price: price })
})
router.get('/', function (req, res) {
    res.render('index', { layout: 'layouts/index' });
});

router.get('/admin/login', function (req, res) {
    res.render('admin/login', { layout: 'layouts/login' })
})

router.get('/admin/dashboard', function (req, res) {
    res.render('admin/dashboard', { layout: 'layouts/dashboard' })
})

router.get('/admin/tablehomepage', function (req, res) {
    res.render('admin/tablehomepage', { layout: 'layouts/dashboard' })
})

router.get('/admin/table', async function (req, res) {
    try {
        return res.render('admin/table', { layout: 'layouts/dashboard'})
    }
    catch (e) {

        return res.json(CreateError(e));
    }
})

router.get('/admin/editprice', function (req, res) {
    res.render('admin/editprice', { layout: 'layouts/dashboard' })
})

router.get('/admin/listRequestCustomer', function (req, res) {
    res.render('admin/listRequestCustomer', { layout: 'layouts/dashboard' })
}) 

module.exports = router

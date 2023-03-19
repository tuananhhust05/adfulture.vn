const frontendRouter = require('./frontend/index.js')
const api = require('./api/api.js')

function router(app) {

    app.use('/api', api)
    app.use(frontendRouter)
    //default router
    app.use((req, res) => {
        res.render('404', { layout: 'layouts/index' })
    })
}

module.exports = router


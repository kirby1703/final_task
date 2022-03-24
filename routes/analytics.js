const express = require("express")
const router = express.Router()
const controller = require('../controllers/analytics')

// Using controllers
router.get('/overview', controller.overview)
router.get('/analytics', controller.analytics)

module.exports = router
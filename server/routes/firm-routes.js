const express = require('express')

const router = express.Router()

const firmController = require("../controllers/firm-controller")

router.post('/register', firmController.register)

module.exports = router; 
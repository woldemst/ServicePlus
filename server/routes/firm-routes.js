const express = require('express')

const router = express.Router()

const firmController = require("../controllers/firm-controller")

router.post('/register', firmController.register)
router.patch('/update/:firmId', firmController.updateFirm)
router.get('/profile', firmController.getFirmProfile)
router.get('/profile/:userId', firmController.getFirmByUserId)
 
module.exports = router; 
const express = require('express')

const router = express.Router()

const appointmentController = require('../controllers/appointment-controller')

router.get('/all', appointmentController.getAllAppointments)

module.exports = router;
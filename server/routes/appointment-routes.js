const express = require('express')

const router = express.Router()

const appointmentController = require('../controllers/appointment-controller')

router.get('/all', appointmentController.getAllAppointments)
router.post('/new', appointmentController.createAppointment)

module.exports = router;
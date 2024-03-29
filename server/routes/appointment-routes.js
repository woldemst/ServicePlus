const express = require('express')

const router = express.Router()

const appointmentController = require('../controllers/appointment-controller')

router.get('/all', appointmentController.getAllAppointments)
router.post('/new', appointmentController.createAppointment)
router.get('/contact-options/:firmId', appointmentController.getAllContactsAsOptionsByFirmId)
router.get('/customer-options/:firmId', appointmentController.getAllCustomersAsOptionsBiFirmId)

module.exports = router;
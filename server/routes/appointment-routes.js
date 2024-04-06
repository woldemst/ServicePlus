const express = require('express')

const router = express.Router()

const appointmentController = require('../controllers/appointment-controller')

router.get('/:firmId/all', appointmentController.getAllAppointments)
router.post('/new', appointmentController.createAppointment)
router.get('/contact-options/:firmId', appointmentController.getAllContactsAsOptionsByFirmId)
router.get('/customer-options/:firmId', appointmentController.getAllCustomersAsOptionsBiFirmId)
router.get('/worker-options/:firmId', appointmentController.getAllWorkersAsOptionsByFirmId)
router.get('/order-options/:firmId', appointmentController.getAllOrdersAsOptionsByFirmId)
module.exports = router;
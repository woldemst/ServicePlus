const express = require('express')

const router = express.Router()

const custommerController = require('../controllers/customer-controller')

router.get('/:firmId/all', custommerController.getAllCustomersByFirmId)
router.get('/:firmId//:customerId', custommerController.getCustomerById)
router.patch('/:firmId/update/:customerId', custommerController.updateCustomerById)
router.post('/:firmId/new', custommerController.createCustomer)

module.exports = router;


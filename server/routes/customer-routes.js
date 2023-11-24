const express = require('express')

const router = express.Router()

const custommerController = require('../controllers/customer-controller')

router.get('/all', custommerController.getAllCustomers)
router.get('/:customerId', custommerController.getCustomerById)

module.exports = router;


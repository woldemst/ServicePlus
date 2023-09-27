const express = require('express')

const router = express.Router()

const custommerController = require('../controllers/customer-controller')

router.get('all', custommerController.getAllCustomers)

module.exports = router;

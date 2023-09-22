const express = require('express')

const router = express.Router()

const orderController = require('../controllers/order-controller')

router.get('/all', orderController.getAllOrders)
router.post('/create', orderController.createOrder)

module.exports = router;
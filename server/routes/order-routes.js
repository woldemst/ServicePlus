const express = require('express')

const router = express.Router()

const orderController = require('../controllers/order-controller')

router.get('/all', orderController.getAllOrders)
router.post('/create', orderController.createOrder)
router.get('/:orderId', orderController.getOrderById)

module.exports = router;
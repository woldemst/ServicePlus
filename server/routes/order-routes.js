const express = require('express')

const router = express.Router()

const orderController = require('../controllers/order-controller')

router.get('/:firmId/all', orderController.getAllOrdersByFirmId)
router.post('/create', orderController.createOrder)
router.get('/:orderId', orderController.getOrderById)

module.exports = router;
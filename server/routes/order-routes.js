const express = require('express')

const router = express.Router()

const orderController = require('../controllers/order-controller')

router.get('/:firmId/all', orderController.getAllOrdersByFirmId)
router.post('/:firmId/new', orderController.createOrder)
router.get('/:orderId', orderController.getOrderById)

// not stable 
router.get('/worker-options/:firmId', orderController.getAllWorkersAsOptions)

module.exports = router;
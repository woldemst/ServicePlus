const express = require('express')

const router = express.Router()

const orderController = require('../controllers/order-controller')

router.get('/:firmId/all', orderController.getAllOrdersByFirmId)
router.post('/:firmId/new', orderController.createOrder)
router.get('/:orderId', orderController.getOrderById)

router.get('/worker-options/:firmId', orderController.getAllWorkersAsOptions)
router.get('/customer-options/:firmId', orderController.getAllCustomersAsOptions)
router.get('/contact-options/:firmId', orderController.getAllContactsAsOptions)

router.patch('/update/:orderId', orderController.updateOrderById)
router.delete('/:orderId/delete', orderController.deleteOrderById)

module.exports = router;
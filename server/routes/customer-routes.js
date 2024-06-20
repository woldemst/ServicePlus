const express = require('express')

const router = express.Router()

const custommerController = require('../controllers/customer-controller')
const fileUpload = require('../middlewares/file-upload')

router.get('/:firmId/all', custommerController.getAllCustomersByFirmId)
router.get('/:firmId//:customerId', custommerController.getCustomerById)
router.patch('/:firmId/update/:customerId', fileUpload.single('avatar'), custommerController.updateCustomerById)
router.post('/:firmId/new', custommerController.createCustomer)
router.delete('/:firmId/delete/:customerId', custommerController.deleteCustomerById)

module.exports = router;

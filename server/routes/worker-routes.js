const express = require('express')

const router = express.Router()

const workerController = require('../controllers/worker-controller')

router.get('/:firmId/all', workerController.getAllWorkersByFirmId)
router.get('/:firmId/:workerId', workerController.getWorkerById)
router.patch('/:firmId/update/:workerId', workerController.updateWorkerById)
router.post('/:firmId/new', workerController.createWorker)

module.exports = router;


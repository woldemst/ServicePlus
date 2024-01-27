const express = require('express')

const router = express.Router()

const workerController = require('../controllers/worker-controller')

router.get('/:firmId/all', workerController.getAllWorkers)
router.get('/:workerId', workerController.getWorkerById)
router.patch('/:workerId', workerController.updateWorkerById)
router.post('/:firmId/new', workerController.createWorker)
router.get('/:firmId/:userId', workerController.getWorkersByFirmId)

module.exports = router;


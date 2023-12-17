const express = require('express')

const router = express.Router()

const workerController = require('../controllers/worker-controller')

router.get('/all', workerController.getAllWorkers)
router.get('/:workerId', workerController.getWorkerById)
router.patch('/:workerId', workerController.updateWorkerById)
router.post('/new', workerController.createWorker)

module.exports = router;


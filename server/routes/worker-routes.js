const express = require('express')

const router = express.Router()

const workerController = require('../controllers/worker-controller')

router.get('/all', workerController.getAllWorkers)
router.get('/:workerId', workerController.getWorkerById)

module.exports = router;


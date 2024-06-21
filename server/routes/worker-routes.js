const express = require('express')

const router = express.Router()

const workerController = require('../controllers/worker-controller')
const fileUpload = require('../middlewares/file-upload')

router.get('/:firmId/all', workerController.getAllWorkersByFirmId)
router.get('/:firmId/:workerId', workerController.getWorkerById)
router.patch('/:firmId/update/:workerId', fileUpload.single('avatar'), workerController.updateWorkerById)
router.post('/:firmId/new', workerController.createWorker)
router.delete('/:firmId/delete/:workerId', workerController.deleteWorkerById)
router.post('/:firmId/join/:userId', workerController.joinFirm)
router.post('/resetPassword/:workerId', workerController.resetWorkerPassword)

module.exports = router;



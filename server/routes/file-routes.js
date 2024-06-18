// routes/file-routes.js
const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/file-controller');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('avatar'), fileController.uploadFile);
router.get('/image/:filename', fileController.getFileByFileName);
router.get('/image/id/:id', fileController.getFileById);

module.exports = router;
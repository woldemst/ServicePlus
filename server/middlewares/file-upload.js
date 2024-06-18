const multer = require('multer')

const storage = multer.memoryStorage();

const fileUpload = multer({
  limits: 500000, // Limit the file size to 500KB
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

module.exports = fileUpload;
// exports.fileUpload = fileUpload; 
// controllers/file-controller.js
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { Readable } = require('stream');
const HttpError = require('../models/http-error');

// initialize gridfs
let gfs;    
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
})

// Upload file
const uploadFile = async (req, res, next) => {

    console.log(req.file);
    if (!req.file) {
        return next(new HttpError('No file provided', 400));
    }
    const fileInfo = {
        filename: 'file_' + Date.now() + '_' + req.file.originalname,
        contentType: req.file.mimetype,
    }

    const readStream = Readable.from(req.file.buffer);
    const writeSream = gfs.createWriteStream(fileInfo.filename);

    readStream.pipe(writeSream);

    writeSream.on('close', (file) => {
        res.json({ file })
    })

    writeSream.on('error', (err) => {
        return next(new HttpError(err.message, 500));
    })
}

const getFileByFileName = async (req, res, next) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return next(new HttpError('File not found', 404));
        }
        
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            return next(new HttpError('File not found', 404));
        }
    })
}

// retrive File by ID
const getFileById = async (req, res, next) => {
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
        if (!file || file.length === 0) {
            return next(new HttpError('File not found', 404));
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            return next(new HttpError('File not found', 404));
        }
    })
}

exports.uploadFile = uploadFile;
exports.getFileByFileName = getFileByFileName;
exports.getFileById = getFileById;
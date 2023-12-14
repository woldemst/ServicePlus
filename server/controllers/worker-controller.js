const HttpError = require("../models/http-error")
const Worker = require('../models/Worker')

const getAllWorkers = async (req, res, next) => {
    try {
        const workers = await Worker.find()
        res.json(workers)
    } catch (err) {
        const error = new HttpError(
            "Fetch the workers failed, please try again later.",
            500
        )
        next(error)
    }
}

const getWorkerById = async (req, res, next) => {
    const workerId = req.params.workerId;

    let worker;

    try {
        worker = await Worker.findById(workerId)
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not find a worker.", 500
        );
        return next(error)
    }

    if (!worker) {
        const error = new HttpError(
            'Could not find customer for the provided id.',
            404
        );
        return next(error)
    }
    res.json({ worker: worker.toObject({getters: true}) })
}

exports.getWorkerById = getWorkerById;
exports.getAllWorkers = getAllWorkers;
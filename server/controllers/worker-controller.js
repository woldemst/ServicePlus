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

exports.getAllWorkers = getAllWorkers;
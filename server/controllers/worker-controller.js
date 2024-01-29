const HttpError = require("../models/http-error")
const Worker = require('../models/Worker')
const Firm = require('../models/Firm')

const getAllWorkersByFirmId = async (req, res, next) => {
    const firmId = req.params.firmId

    try {

      const workers = await Worker.find({ firmId: firmId });

      if (!workers || workers.length === 0) {
        const error = new HttpError(
            'Could not find workers for the provided firm id.',
            404
          );
          return next(error);
      }

      res.json({
        workers: workers.map(worker => worker.toObject({ getters: true })),
    });
    } catch (err) {
      const error = new HttpError(
        'Fetching workers failed, please try again later.',
        500
      );
      return next(error);
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

const updateWorkerById = async (req, res, next) => {
    const workerId = req.params.workerId;
     
    const {
        name, 
        email, 
        workerNr,
        street, 
        houseNr, 
        zip, 
        place, 
        phone, 
        mobilePhone, 
        description 
    } = req.body

    let updatedWorker
    try {
        updatedWorker = await Worker.findById(workerId)

        if(!updatedWorker){
            const error = new HttpError('Could not find worker for the provided ID.', 404);
            return next(error);
        }

        updatedWorker.name = name,
        updatedWorker.email = email,
        updatedWorker.workerNr = workerNr,
        updatedWorker.mobilePhone = mobilePhone,
        updatedWorker.description = description,
        updatedWorker.street = street,
        updatedWorker.houseNr = houseNr,
        updatedWorker.zip = zip,
        updatedWorker.place = place,
        updatedWorker.phone = phone,

        await updatedWorker.save()

        res
            .status(200)
            .json({ worker: updatedWorker.toObject({ getters: true }) });
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not update profile.",
            500
          );
          return next(error);
    }
}

const createWorker = async (req, res, next) => {
    const {
        firmId,
        name, 
        email, 
        street, 
        houseNr, 
        zip, 
        place, 
        phone, 
        description,
        // workerNr,
        // mobilePhone, 
    } = req.body

    const createWorker = new Worker({
        firmId: firmId,
        name: name, 
        email: email, 
        street: street, 
        houseNr: houseNr, 
        zip: zip, 
        place: place, 
        phone: phone, 
        description: description,
        // workerNr: workerNr,
        // mobilePhone: mobilePhone, 
    })
    
    try {
        await createWorker.save()
    } catch (err) {
        const error = new HttpError(
        "Something went wrong, could not create profile.",
        500
        );
        return next(error);
    }

    res
    .status(201)
    .json({ worker: createWorker.toObject({ getters: true }) });
}

const getWorkersByFirmId = async (req, res, next) => {
    const firmId = req.params.firmId
    const workerId = req.params.workerId


    try {
      const firm = await Firm.findById(firmId);

      if (!firm) {
          return next(new HttpError('Could not find firm for the provided ID.', 404));
      }

      const workers = await Worker.find({ firmId: firmId });

      if (!workers || workers.length === 0) {
        const error = new HttpError(
            'Could not find workers for the provided firm id.',
            404
          );
          return next(error);
      }

      res.json({
        workers: workers.map(worker => worker.toObject({ getters: true })),
    });
    } catch (err) {
      const error = new HttpError(
        'Fetching workers failed, please try again later.',
        500
      );
      return next(error);
    }

    console.log('firm with Workers',firmWithWorkers);
  
}



exports.getAllWorkersByFirmId = getAllWorkersByFirmId;
exports.getWorkerById = getWorkerById;
exports.updateWorkerById = updateWorkerById;
exports.createWorker = createWorker;
exports.getWorkersByFirmId = getWorkersByFirmId;
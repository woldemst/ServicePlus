const HttpError = require("../models/http-error")
const Appointment = require("../models/Appointment")

const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find()
        res.json(appointments)
    } catch (err) {
        const error = new HttpError(
            "Fetch the appointments failed, please try again later.",
            500
        )
        next(error)
    }
}

const createAppointment = async (req, res, next) => {

    const {
        // firmId,
        // creator,
        // status,

        order,
        worker,
        customer,
        name,
        date,
        startTime,
        finishTime,
        description,
    } = req.body;


    const createdAppointment = new Appointment({
        // firmId: firmId,
        // creator: creator, // auth.userId in frontend 
        // status: status,
        order: order,
        worker: worker,
        customer: customer,
        name: name,
        date: date,
        startTime: startTime,
        finishTime: finishTime,
        description: description,
    });
    try {
        await createdAppointment.save()
        res.status(201).json({ appointment: createdAppointment.toObject({ getters: true }) }); // Send a response indicating success

    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not create an appointment.",
            500
        );
        return next(error);
    }
}


exports.getAllAppointments = getAllAppointments;
exports.createAppointment = createAppointment;
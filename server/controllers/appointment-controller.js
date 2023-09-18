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

exports.getAllAppointments = getAllAppointments; 
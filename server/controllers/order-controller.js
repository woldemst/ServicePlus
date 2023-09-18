const Order = require("../models/Order")
const HttpError = require("../models/http-error")

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (err) {
        const error = new HttpError(
            'Fetch the orders failed, please try again later',
            500
        )

        next(error)
    }
}

exports.getAllOrders = getAllOrders;
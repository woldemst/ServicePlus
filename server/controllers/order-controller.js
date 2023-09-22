const Order = require("../models/Order")
const HttpError = require("../models/http-error")
// const uuidv4 = require('uuidv4')

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

const createOrder = async (req, res, next) => {
    
    const {name, creator, worker, date, customer, status, contact, description } = req.body

    const createdOrder  = new Order({
        // id: uuidv4(),
        name: name,
        creator: creator,
        worker: worker,
        date: date,
        customer: customer,
        status: status, 
        contact: contact, 
        description: description
    })

    try {
        await createdOrder.save()
    } catch (err) {
        console.log(err);
        return next(err)
    }

    res.status(201).json({
        // orderId: createdOrder.id,
        name: createdOrder.name, 

    })
}

exports.getAllOrders = getAllOrders;
exports.createOrder = createOrder;
const Firm = require("../models/Firm")
const HttpError = require("../models/http-error")

const register = async (req, res, next) => {
    // destructuring assignment from body
    const {name, owner, email, street, houseNr, zip, place, phone, website } = req.body

    let existingFirm; 

    try {
        existingFirm = await Firm.findOne({email})
    } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try agail later.",
            500
        );
        return next(error)
    }

    // creating new firm 
    const createdFirm =  new Firm({
        name,
        owner,
        email, 
        street, 
        houseNr, 
        zip, 
        place, 
        phone, 
        website
    })

    try {
        await createdFirm.save()

    } catch (err) {
        console.log(err)
        return next(err)
    }

    res.status(201).json({
        firmId: createdFirm.id, 
        email: createdFirm.email
    })
}

exports.register = register; 
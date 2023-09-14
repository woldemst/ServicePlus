const User = require('../models/User')


const register = async (req, res, next) => { 
    // destructuring assignment from body 
    const { name, email, password } = req.body; 

    // check if a user with tre same email exists using the User model 

    let existingUser; 

    try{
        existingUser = await User.findOne({email})
    }catch(err){
        console.log(err);
        return next(err)
    }

    // creating of new user
    const createdUser = new User({
        name: name, 
        email: email, 
        password: password
    })

    try {
        await createdUser.save()
    } catch (err) {
        console.log(err);
        return next(err)
    }

    res
    .status(201)
    .json({
        userId: createdUser.id, 
        email: createdUser.email,
    
    })
}

exports.register = register; 
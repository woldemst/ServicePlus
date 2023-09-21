const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(bodyParser.json())

const userRoutes = require('./routes/user-routes');
const orderRoutes = require('./routes/order-routes')
const appointmentRoutes = require('./routes/appointment-routes')
const firmRoutes = require('./routes/firm-routes')

// routes 
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/firm', firmRoutes)

const connectionURL = 'mongodb+srv://waldemar:1234@clusterplus.5ckgjtl.mongodb.net/ServicePlus?retryWrites=true&w=majority'

const connectionOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}

mongoose
    .connect(connectionURL, connectionOptions)
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch(err => {
        console.log(err);
    })
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(bodyParser.json())

// exports routes 
const userRoutes = require('./routes/user-routes');
const orderRoutes = require('./routes/order-routes')
const appointmentRoutes = require('./routes/appointment-routes')
const firmRoutes = require('./routes/firm-routes')
const customerRoutes = require('./routes/customer-routes')
const workerRoutes = require('./routes/worker-routes')

// CORS 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // not like "GET", "POST", "PATCH", "DELETE" it does not work 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
    next();
});

// routes 
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/firm', firmRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/workers', workerRoutes)

// connection string 
const connectionURL = 'mongodb+srv://waldemar:1234@clusterplus.5ckgjtl.mongodb.net/ServicePlus?retryWrites=true&w=majority'

const connectionOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}

// connection 
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
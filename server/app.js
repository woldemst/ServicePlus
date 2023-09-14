const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

app.use(express.json())

const userRoutes = require('./routes/user-routes')


// routes 
app.use('/api/users', userRoutes)

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
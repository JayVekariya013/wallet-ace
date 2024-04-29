const mongoose = require('mongoose');

// require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect('mongodb://0.0.0.0:27017/expenses', {
        useNewUrlParser:true,   
        useUnifiedTopology:true
    })
    .then(()=>console.log("DB Connected Successfully."))
    .catch((error)=>{
        console.log("Error connecting DB");
        console.log(error.message);
        process.exit(1);
    });
}

module.exports = dbConnect ;
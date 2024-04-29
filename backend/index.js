// const express = require('express');
// const cors = require('cors'); // Import the cors middleware
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors()); // Use the cors middleware

// mongoose.connect(`mongodb://127.0.0.1:27017/wallet-ace`, {
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
// .then(() => {console.log("Connection Successful")})
// //.catch( (error) => {console.log("Recieved an error")}) ;
// .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Define your routes and middleware here
// const signupRoute = require('../routes/signup');
// app.use('/api', signupRoute);

// const loginRoute = require('../routes/login');
// app.use('/api', loginRoute);


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
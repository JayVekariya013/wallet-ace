const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


// require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
const dbConnect = require("./config/database");
dbConnect();

// Define expense schema
const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  paymentAccount: { type: String, required: true }
});


const Expense = mongoose.model('Expense', expenseSchema);
const Users = require('./models/user');
const Account = require('./models/cardForm')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes and middleware here
const signupRoute = require('./routes/signup');
app.use('/api', signupRoute);

const loginRoute = require('./routes/login');
const user = require('./models/user');
app.use('/api', loginRoute);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle expense creation
app.post('/api/addExpense', (req, res) => {
  const expenseData = req.body;

  // Create a new expense document
  const newExpense = new Expense(expenseData);

  // Save the expense document to the database
  newExpense.save()
    .then(savedExpense => {
      console.log('Expense saved successfully:', savedExpense);
      res.status(201).json(savedExpense);
    })
    .catch(err => {
      console.error('Error saving expense:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Route to retrieve expenses data
app.get('/api/expenses', (req, res) => {
  Expense.find({})
    .then(expenses => {
      res.json(expenses);
    })
    .catch(err => {
      console.error('Error retrieving expenses:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});
// Route to retrieve expenses data
app.post('/api/signup', async (req, res) => {
  console.log("req", req.body)
  const { email, sPassword, sName } = req.body;
  if (!email || !sPassword || !sName) {

    res.status(400).send({
      code: 400,
      message: "please enter proper values."
    })
  }
  const createUserb = await Users.create({
    username: sName,
    email: email,
    password: sPassword,
  });
  console.log('createUserb :>> ', createUserb);

  res.status(200).send({
    code: 200,
    message: "Successfully register"
  })

});
app.post('/api/login', async (req, res) => {
  console.log("req", req.body)
  const { email, sPassword } = req.body;
  if (!email || !sPassword) {

    res.status(400).send({
      code: 400,
      message: "please enter proper values."
    })
  }
  const findUserAuth = await Users.findOne({
    email: email,
    password: sPassword
  });
  console.log("findUserAuth", findUserAuth)
  if (findUserAuth && findUserAuth.data) {

  }
  console.log('findUserAuth :>> ', findUserAuth);

  res.status(200).send({
    code: 200,
    message: "Successfully register"
  })

});

app.post('/api/account', async (req, res) => {
  // console.log("req", req.body)
  const { cardHolderName, cardNumber } = req.body;
  if (!cardHolderName || !cardNumber) {

    res.status(400).send({
      code: 400,
      message: "please enter proper values."
    })
  }

  const AccountData = await Account.create({
    cardHolderName: cardHolderName,
    cardNumber: cardNumber
  });
  // console.log('AccountData :>> ', AccountData);

  res.status(200).send({
    code: 200,
    message: "Successfully register"
  })



})

app.get('/api/account', async (req, res) => {
  try {
    // console.log('AccountData :>> ', AccountData);
    const cardData = await Account.find({});
    // console.log('cardData :>> ', cardData);
    res.status(200).send({
      code: 200,
      message: "Successfully register",
      result : cardData

    })
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/expenses', async (req, res) => {
  try {
      // Fetch last 10 expenses data from the database
      const expenses = await Expense.find().sort({ date: -1 }).limit(10);

      // Send the fetched expenses data as JSON response
      res.json(expenses);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


// require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/expenses?connectTimeoutMS=5000&directConnection=true&serverSelectionTimeoutMS=5000', {
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Error connecting to MongoDB:', err));

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes and middleware here
const signupRoute = require('./routes/signup');
app.use('/api', signupRoute);

const loginRoute = require('./routes/login');
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

// Endpoint to fetch expenses data
app.get('/api/getExpenses', async (req, res) => {
  try {
      // Fetch expenses data from the database
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
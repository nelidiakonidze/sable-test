const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const transactionsController = require('./controllers/transactionsController');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Get all the Transactions
app.get('/transactions', (req, res) => {
  const transactions = transactionsController.listTransactions();
  return res.send(transactions);
});

// Get a Transaction by Id
app.get('/transactions/:id', (req, res) => {
  const transaction = transactionsController.getTransaction(req.params.id);

  if (transaction === undefined) {
    res.send(`There is no Transaction with id '${transactionId}'`).status(404);
  } else {
    res.send(transaction);
  }
});

// Update a Transaction
app.put('/transactions/:id', (req, res) => {
  const updatedTransaction = req.body;
  const transactionToUpdateId = req.params.id;

  const transaction = transactionsController.updateTransaction(
    transactionToUpdateId,
    updatedTransaction,
  );

  if (transaction === undefined) {
    res.send(`There is no Transaction with id '${transactionId}'`).status(404);
  } else {
    res.send(transaction);
  }
});

app.get('/*', function(req, res) {
  res.send('Sable Reported Transactions');
});

app.listen(port, () =>
  console.log(`Sable Reported Transactions api listening on ${port}!`),
);

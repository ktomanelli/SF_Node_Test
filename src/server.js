const express = require('express');
const cors = require('cors');
const Creditor = require('./db/creditor');
const init = require('./db/db');

const app = express();
init();
app.use(cors());
app.use(express.json());

// Get all creditor data with total balance and average min pay percentage
app.get('/api/balance', (req, res) => {
  // collecting all creditors
  Creditor.find({}).then(data => {
    // getting sum of all balance and minPaymentPercentage
    const payload = data.reduce(
      (acc, current) => ({
        totalBalance: acc.totalBalance + current.balance,
        avgMinPaymentPercentage:
          acc.avgMinPaymentPercentage + current.minPaymentPercentage,
      }),
      {
        totalBalance: 0,
        avgMinPaymentPercentage: 0,
      }
    );
    // getting average of minPaymentPercentage
    payload.avgMinPaymentPercentage /= data.length;
    // adding all creditor data to payload
    payload.creditors = data;
    res.send({ data: payload });
  });
});

// Get creditor data by creditor name
app.get('/api/creditor/:creditorName', (req, res) => {
  const creditorName = req.params.creditorName.toUpperCase();
  // find creditor by specified name
  Creditor.find({ creditorName }).then(creditor => res.send(creditor));
});

// Implement credit analysis endpoint to return data that meet following criteria:
// a. Creditor balance should be over 2000
// b. Creditor min pay percentage shouldn’t exceed 29.99%
app.get('/api/analysis', (req, res) => {
  // find creditors who have balance greater than 2000 AND minPaymentPercentage less than 29.99
  Creditor.find({
    $and: [
      { balance: { $gt: 2000 } },
      { minPaymentPercentage: { $lt: 29.99 } },
    ],
  }).then(creditors => res.send(creditors));
});

// Add a new creditor entry
app.post('/api/creditor', (req, res) => {
  // create new Creditor instance
  const creditor = new Creditor(req.body);
  // save to db
  creditor
    .save()
    .then(() => res.status(200).send(creditor))
    .catch(e => res.status(400).send({ message: e }));
});

// Update an existing creditor entry (partial or full update)
app.patch('/api/creditor/:id', (req, res) => {
  const { id } = req.params;
  // find document and update with given body
  Creditor.findByIdAndUpdate(id, { ...req.body })
    .then(() => Creditor.find({ _id: id }))
    .then(creditor => res.status(200).send(creditor))
    .catch(e => {
      res.status(400).send({ message: e });
    });
});

// handles 404s
app.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

app.listen(3000, () => console.log('App listening on port 3000'));

module.exports = app;

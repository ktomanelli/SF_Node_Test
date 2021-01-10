const mongoose = require('mongoose');
const Creditor = require('./creditor');
const init = require('./db');

init();
// test data array
const data = [
  {
    creditorName: 'CBNA',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 2,
    balance: 1363,
  },
  {
    creditorName: 'AMEX',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 2,
    balance: 2763,
  },
  {
    creditorName: 'AMEX',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 2,
    balance: 429,
  },
  {
    creditorName: 'AMEX',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 2,
    balance: 1363,
  },
  {
    creditorName: 'DISCOVERBANK',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 2,
    balance: 2644,
  },
  {
    creditorName: 'CAPITAL ONE',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 4,
    balance: 5464,
  },
  {
    creditorName: 'CAPITAL ONE',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 4,
    balance: 2345,
  },
  {
    creditorName: 'CAPITAL ONE',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 4,
    balance: 836,
  },
  {
    creditorName: 'CBNA',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 3.5,
    balance: 687,
  },
  {
    creditorName: 'CBNA',
    firstName: 'Suman',
    lastName: 'Tester79',
    minPaymentPercentage: 3.5,
    balance: 235,
  },
];

const seed = () => {
  const { creditors } = mongoose.connection.collections;
  // empty db before seed
  return creditors.drop().then(
    () =>
      new Promise(async (resolve, reject) => {
        // iterate through test data array and save to db
        for (const item of data) {
          const creditor = new Creditor(item);
          await creditor.save().catch(e => reject(e));
          console.log('saved item');
        }
        mongoose.disconnect();
        resolve();
      })
  );
};

seed();
module.exports = { seed };

// /* eslint-disable no-undef */
const mongoose = require('mongoose');
const Creditor = require('../src/db/creditor');
require('dotenv').config();

beforeEach(done => {
  const { creditors } = mongoose.connection.collections;
  creditors.drop().then(() => done());
});

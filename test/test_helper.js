// /* eslint-disable no-undef */
const mongoose = require('mongoose');
require('dotenv').config();

beforeEach(done => {
  const { creditors } = mongoose.connection.collections;
  creditors.drop().then(() => done());
});

const mongoose = require('mongoose');
require('dotenv').config();

// initiates connection to db
const init = async () => {
  const res = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  if (res) console.log('Connected successfully');
  else console.log('Error connecting');
};

module.exports = init;

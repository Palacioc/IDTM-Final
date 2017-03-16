/*jshint esversion:6*/

const mongoose = require('mongoose');
const dbName = 'final-project';

// connect to the database
mongoose.connect(`mongodb://localhost/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the ${dbName} database`);
});

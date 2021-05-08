const mongoose = require('mongoose');
const chalk = require('chalk');

const { MONGO_DB_USER, MONGO_DB_PASS } = process.env;

mongoose.connect(
  `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@cluster0.n34xz.mongodb.net/db_product?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
  console.log(chalk.greenBright.bold('[CONNECTED]'), 'MongoDB');
});

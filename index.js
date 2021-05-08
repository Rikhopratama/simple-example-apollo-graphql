const dotenv = require('dotenv');
dotenv.config();

// Init mongodb using mongoose
require('./mongoose');

// Startup apollo graphql server
require('./apollo');

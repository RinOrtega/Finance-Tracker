const mongoose = require('mongoose');

// come back to put in the actual server route
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finance-tracking');

module.exports = mongoose.connection;

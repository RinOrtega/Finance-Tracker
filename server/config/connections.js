const mongoose = require('mongoose');

// come back to put in the actual server route
mongoose.connect(process.env.MONGODB_URI || '//placeholder');

module.exports = mongoose.connection;

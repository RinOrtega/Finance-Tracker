const mongoose = require('mongoose');

// come back to put in the actual server route
mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;

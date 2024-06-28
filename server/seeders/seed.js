const db = require('../config/connection');
const { User, Transaction } = require('../models');
const userSeeds = require('./userSeeds.json');
const transactionSeeds = require('./transactionSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async() => {
    try {
        await cleanDB('Transaction', 'transactions');

        await cleanDB('User', 'users');

        await User.create(userSeeds);

        await Transaction.create(transactionSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('all done!');
    process.exit(0);
});
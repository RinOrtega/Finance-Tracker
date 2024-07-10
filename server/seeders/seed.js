const db = require('../config/connection');
const { User, Transaction, Category } = require('../models');
const userSeeds = require('./userSeeds.json');
const transactionSeeds = require('./transactionSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async() => {
    try {
        await cleanDB('Transaction', 'transactions');

        await cleanDB('User', 'users');

        await cleanDB('Category', 'category')

        await User.create(userSeeds);

        await Transaction.create(transactionSeeds);

        await Category.create(categorySeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('all done!');
    process.exit(0);
});
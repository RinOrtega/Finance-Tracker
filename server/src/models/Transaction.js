const { Schema, model } = require('mongoose');

const transactionsSchema =  new Schema(
    {
        Amount: {
            type: Number,
            default: true,
        },
        Description: {
            type: String,
            default: true,
        },
        Date: {
            type: Date,
            default: Date.now,
        },
        Category: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
            },
        ], 
    }
)
const Transactions = model('transactions', transactionsSchema);

module.exports = Transactions;
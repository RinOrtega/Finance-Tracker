const { Schema, model } = require('mongoose');

const transactionSchema =  new Schema(
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
        Category: 
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
            }, 
    }
)
const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;
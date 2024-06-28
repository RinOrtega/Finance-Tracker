const { User, Transaction } = require('../models'); 

const resolvers = {
    Query: {
        getUser: async (parent, {userId}) => {
            return User.findById({userId});
        },
        getTransaction: async (parent, {transactionId}) => {
            return Transaction.findById(transactionId);
        },
    },
};

module.exports = resolvers;
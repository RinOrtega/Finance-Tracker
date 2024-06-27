const { User, Transactions } = require('../models');

const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
        transactions: async (parent, {_Id}) => {
            const params = _id ? { _id } : {};
            return Transactions.find(params);
        },
    },
};

module.exports = resolvers;
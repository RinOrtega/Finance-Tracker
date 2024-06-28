const { User, Transaction } = require('../models'); 

const resolvers = {
    Query: {
        getUser: async (parent, {_id}) => {
            return User.findById({_id});
        },
        getTransaction: async (parent, {_id}) => {
            return Transaction.findById(_id);
        },
    },
};

module.exports = resolvers;
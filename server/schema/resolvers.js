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

    // fix 
    Mutation: {
        // addUser: async (parent, { firstName, lastName }) => {
        //     const user = await User.create({ firstName, lastName });
        //     const token  = 
        // },
        addTransaction: async (parent, { Amount, Description, Date, Category }, context) => {
        if (context.user) {
            const transaction = await Transaction.create({
                Amount, Description, Date,
                transactionUser: context.user                
            });

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { transactions: transaction._id } }
            );

            return transaction;
        }
        throw AuthenticationError;
    },
        removeTransaction: async (parent, { Amount, Description, Date, Category }, context) => {
            if (context.user) {
                const transaction = await Transaction.findOneAndDelete({
                    _id: transactionId,
                    transactionUser: context.user
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { transactions: transaction._id } }
                );

                return transaction;
            }
            throw AuthenticationError;
        },
    }
};

module.exports = resolvers;
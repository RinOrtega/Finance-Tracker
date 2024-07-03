const { User, Transaction } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        getUser: async (parent, { _id }) => {
            return User.findById({ _id });
        },
        getTransaction: async (parent, { _id }) => {
            return Transaction.findById(_id);
        },

        // logs in a user
        me: async (parent, args, context) => {
            // check if users exist
            if (context.user) {
                // looks for user by id and looks at the password for that user
                const userData = await User.findOne({ _id: context.user._id }).select(
                    "-__v -password"
                );
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
    },

    // fix 
    Mutation: {
        // this creates a user 
        addUser: async (parent, { firstName, lastName, email, password }) => {
            const user = await User.create({ firstName, lastName, email, password });
            const token = signToken(user);

            return { token, user };
        },

        // this is for when user logs in
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            console.log("user",user);
            if (!user) {
                throw  new AuthenticationError("Incorrect email");
            }


            const correctPw = await user.isCorrectPassword(password);

            console.log("correctpw",correctPw)
            if (!correctPw) {
                throw new AuthenticationError("Incorrect Password");
            }

            const token = signToken(user);
            return { token, user };
        },
        //  this creates a transaction
        addTransaction: async (parent, { Amount, Description, Date, Category, input}, context) => {
            if (context.user) {
                const transaction = await Transaction.create({
                    Amount, Description, Date,
                    transactionUser: context.user
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { transactions: input } },
                    { new: true, runValidators: true }
                );

                return transaction;
            }
            throw AuthenticationError;
        },

        // this removes the transaction  from the user when delete button is pressed
        removeTransaction: async (parent, { transactionId }, context) => {
            if (context.user) {
                const transaction = await Transaction.findOneAndDelete(
                    {
                        _id: transactionId,
                        transactionUser: context.user
                    });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { transactions: { transactionId: transactionId }} },
                    {new: true }
                );

                return transaction;
            }
            throw AuthenticationError;
        },
    }
};

module.exports = resolvers;
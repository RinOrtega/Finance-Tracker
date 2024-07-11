const { User, Transaction } = require('../models');
const Category = require('../models/Category');
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
            throw AuthenticationError;
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
            console.log("user", user);
            if (!user) {
                throw new AuthenticationError("Incorrect email");
            }


            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect Password");
            }

            const token = signToken(user);
            return { token, user };
        },
        //  this creates a transaction
        addTransaction: async (parent, { input, _id}, context) => {
            // destructing the input from the client side
            const { Amount, Description, Date, Categories } = input; 
            

            if (context.user) {
                // Find the category by its string value
                const category = await Category.findOne({ categoryType: Categories});
                if (!category) {
                    throw new Error('Category not found');
                }
                console.log(Category.categoryType)
                // This creates a new transaction
                const transaction = await Transaction.create({
                    Amount,
                    Description,
                    Date,
                    Categories: category._id
                });
        
                // Update the user's transactions array
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { transactions: transaction._id } },
                    { new: true, runValidators: true }
                ).populate('transactions'); // Populate the transactions array
        
                return updatedUser;
                }
                throw AuthenticationError;
            },

                // this removes the transaction  from the user when delete button is pressed
                removeTransaction: async (parent, { _id }, context) => {
                    if (context.user) {
                        const transaction = await Transaction.findOneAndDelete(
                            {
                                _id: transaction._id,
                                transactionUser: context.user
                            });

                        await User.findOneAndUpdate(
                            { _id: context.user._id },
                            { $pull: { transactions: { _id: _id } } },
                            { new: true }
                        );

                        return transaction;
                    }
                    throw AuthenticationError;
                },
    }
    };

    module.exports = resolvers;
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

        // logs in a user and 
        me: async (parent, args, context) => {
            // Check if user is authenticated
            if (!context.user) {
                throw AuthenticationError;
            }

            try {
                // Fetch user data excluding password
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate({
                    path: 'transactions',
                    populate: {
                        path: 'Categories',
                        model: 'Category'
                    }
                });
                ;

                // If user data is not found
                if (!userData) {
                    throw new Error('User not found');
                }

                return userData;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    },

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
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        //  this creates a transaction
        addTransaction: async (parent, { input }, context) => {
            // destructing the input from the client side
            const { Amount, Description, Date, Categories } = input;

            if (context.user) {
                try {
                    // Find the category by its string value
                    const category = await Category.findOne({ categoryType: Categories });
                    if (!category) {
                        throw new Error('Category not found');
                    }


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
                    )
                        .populate({
                            path: 'transactions',
                            populate: {
                                path: 'Categories',
                                model: 'Category'
                            }
                        });

                    return updatedUser;
                } catch (error) {
                    console.error('Error adding transaction:', error);
                    throw new Error('Failed to add transaction');
                }
            } else {
                throw new AuthenticationError('User not authenticated');
            }
        },

        // this removes the transaction  from the user when delete button is pressed
        removeTransaction: async (parent, { _id }, context) => {
            if (context.user) {
                try {
                    const transaction = await Transaction.findOneAndDelete({ _id });

                    if (!transaction) {
                        throw new Error('Transaction not found');
                    }

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { transactions: { _id: _id } } },
                        { new: true }
                    ).populate({
                        path: 'transactions',
                        populate: {
                            path: 'Categories',
                            model: 'Category'
                        }
                    });

                    // Ensure all transactions have a non-null Amount field before returning
                    updatedUser.transactions.forEach(transaction => {
                        if (transaction.Amount === null || transaction.Amount === undefined) {
                            transaction.Amount = 0; // Set a default value or handle appropriately
                        }
                    });

                    return updatedUser;
                } catch (error) {
                    console.error('Error removing transaction:', error);
                    throw new Error('Error removing transaction');
                }
            } else {
                throw new AuthenticationError('Not authenticated');
            }
        }
    }
};

module.exports = resolvers;
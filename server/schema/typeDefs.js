const typeDefs = `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        Transactions: [Transaction]
    }
    type Transaction {
        _id: ID!
        Amount: Float!
        Description: String!
        Date: String!
        Category: Category
    }
    type Category {
        _id: ID!
        categoryName: String!
    }
    type Query {
        getUser(_id: ID!): User
        getTransaction(_id: ID!): Transaction
    }
`;

module.exports = typeDefs;

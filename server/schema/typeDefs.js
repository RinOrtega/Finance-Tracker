const typeDefs = `
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    Transactions: [Transaction]
}

type Transaction {
    _id: ID!
    transactionId: String!
    Amount: Float!
    Description: String!
    Date: String!
    Categories: [Category]
}

type Category {
    _id: ID!
    categoryName: String!
}

input TransactionInput {
    transactionId: String!
    Amount: Float!
    Description: String!
    Date: String!
    Categories: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    getUser(_id: ID!): User
    getTransaction(_id: ID!): Transaction
    me: User
}

type Mutation {
    addUser(firstName: String! lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTransaction(input: TransactionInput!): User
    removeTransaction(transactionId: String!): User
}
`;

module.exports = typeDefs;

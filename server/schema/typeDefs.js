const typeDefs = `
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    transactions: [Transaction]
}

type Transaction {
    _id: ID!
    Amount: Float!
    Description: String!
    Date: String!
    Categories: [Category]
}  

type Category {
    _id: ID!
    categoryType: String!
}

input TransactionInput {
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
    removeTransaction(_id: ID!): User
}
`;

module.exports = typeDefs;

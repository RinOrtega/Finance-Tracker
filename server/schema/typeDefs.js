const typeDefs = `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
    }
    type Transactions {
        _id: ID!
        Amount: Dec!
        Description: String!
        Date: Date
    }
    type Categories {
        _id: ID!
        categoryName: String!
    }
`;

module.exports = typeDefs;

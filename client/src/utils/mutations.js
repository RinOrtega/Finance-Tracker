import { gql } from '@apollo/client';

// query to log in user
export const LOGIN_USER = gql `
    mutation login ($email:String!, $password:String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
                firstName
                lastName
            }
        }
    }
`;

// adding a user that requires email, first & last name and password
export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!){
        addUser (firstName: $firstName, lastName: $lastName, email: $email, password: $password){
            token
            user{
                _id
                firstName
                lastName
                email
            }
        }
    } 
`;

// adds the transaction to user list
export const ADD_TRANSACTION = gql`
    mutation  addTransaction($input: TransactionInput!) {
        addTransaction(input: $input){
            _id
            firstName
            lastName
            email
            transactions {
                _id
                Amount
                Description
                Date
                Categories{
                    _id
                    categoryType
                }
            }
        }
    }
`;


// removes the transaction from user list
export const REMOVE_TRANSACTION = gql`
    mutation removeTransaction($_id: ID!) {
        removeTransaction(_id: $_id) {
            _id
            firstName
            lastName
            email
            transactions {
                _id
                Amount
                Description
                Date
                Categories{
                    _id
                    categoryType
                }
            }
        }
    }
`;
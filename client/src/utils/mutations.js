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
        addUser ($firstName: String!, $lastName: String!, email: $email, password: $password){
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

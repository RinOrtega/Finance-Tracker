import { gql } from "@apollo/client";
// this will execute the me query 
export const GET_ME = gql`
    query me {
        me {
            _id
            firstName
            lastName
            email
            Transactions {
                Amount
                Description
                Date
                Categories{
                    categoryName   
                }
            }
        }
    }
`;
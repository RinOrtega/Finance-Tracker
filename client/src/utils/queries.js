import { gql } from "@apollo/client";
// this will execute the me query 
export const GET_ME = gql`
    query me {
        me {
            _id
            firstName
            lastName
            email
            transactions{
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
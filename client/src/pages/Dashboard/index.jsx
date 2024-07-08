import { useState, useEffect } from "react";
import TransactionList from "./TransactionList"
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

// importing the auth and localStorage
import Auth from "../../utils/auth";
import { TransactionsIds, getTransactionsIds } from "../../utils/localStorage";

// importing Apollo hook and mutation
import { ADD_TRANSACTION } from "../../utils/mutations";
import { useMutation } from "@apollo/client";


const Dashboard = () => {

    // create state to hold saved transaction id values

    const [TransactionsIds, setTransactionsIds] = useState(getTransactionsIds());

    // set up useEffect hook to save `TransactionIds` list to localStorage on component unmount

    // useEffect(() => {
    //     return () => TransactionsIds(TransactionsIds);
    // });

    //setting up the ADD_TRANSACTION Mutation

    const [addTransaction] = useMutation(ADD_TRANSACTION)

 // this is th value of the forms
    const [transactionFormData , setTransactionFormData] = useState ({description:'',amount:'',category:'',date:'' })


    // handles the input change 
    const handleInputChange = (event) => {
        const {Transactions, value} = event.target;
        setTransactionFormData({...transactionFormData, [Transactions]: value});
    };


    // the is handleSubmit is for the add button at the end of the page.
    const handleSubmit = (event) => {
        event.preventDefault();

        setTransactionFormData({
        description:'',
        amount:'',
        category:'',
        date:'' 
        })
    };


    // this is the react and material ui components that are rendered
    return (
        <Container maxWidth="md" sx={{ mt: 15, textAlign: "center" }}>

            <Box component="main" sx={{ p: 2, border: '1px solid grey' }}>

                {/* The Budget total  */}
                <Box component="div" sx={{ textAlign: 'center', m: 2 }}>
                    <Typography variant="h4">
                        Hello, user.firstname this is your current budget:

                    </Typography>


                    {/* This is the total budget */}
                    <Typography
                        variant="h3"
                        fontFamily="monospace"
                        color="primary"
                    >
                        $400.00
                    </Typography>

                </Box>


                {/* All the transaction form input */}
                <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: "center" }}>
                    <Box component="div">
                        <Box component="div">


                            <FormControl fullWidth sx={{ width: 300, m: 2 }}>
                                <InputLabel>Description</InputLabel>
                                <OutlinedInput
                                    id="description"
                                    label="Description"
                                    value={transactionFormData.description} 
                                    variant="filled"
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            {/* Description input box */}
                            {/* Amount inputbox */}
                            <FormControl fullWidth sx={{ width: 300, m: 2 }}>
                                <InputLabel>Amount</InputLabel>
                                <OutlinedInput
                                    id="amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                    value={transactionFormData.amount}
                                    onChange={handleInputChange}
                                />
                            </FormControl>

                        </Box>
                        {/* Select drop down Category */}
                        <FormControl sx={{ width: 300, m: 2 }}>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-select"
                                value={transactionFormData.category}
                                label="Category"
                                onChange={handleInputChange}
                            >
                                <MenuItem >Food</MenuItem>
                                <MenuItem >Rent</MenuItem>
                                <MenuItem >Salary</MenuItem>
                                <MenuItem >Utilities</MenuItem>
                                <MenuItem >Entertainment</MenuItem>
                                <MenuItem >Other</MenuItem>

                            </Select>
                        </FormControl>

                        {/* Payment Method dropdown*/}

                        <FormControl sx={{ width: 300, m: 2 }} >
                            <InputLabel id="payment-label">Date</InputLabel>
                            <Select
                                labelId="payment-label"
                                id="payment-select"
                                value={transactionFormData.date}
                                label="Payment"
                                onChange={handleInputChange}>

                                <MenuItem >Credit card</MenuItem>
                                <MenuItem >Cash</MenuItem>
                                <MenuItem >Bank transfer</MenuItem>

                            </Select>
                        </FormControl>

                        {/* Add button to add transactions */}
                        <Box component="div" sx={{ mb: 2 }}>
                            <Button type="submit" variant="contained">
                                ADD
                            </Button>
                        </Box>

                    </Box>
                </Box>

                {/* This is the table with all the transaction values */}
                <TransactionList />
            </Box>

        </Container>
    );
};

export default Dashboard;

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
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

// importing the auth and localStorage

import Auth from "../../utils/auth";
import { saveTransactionIds, getTransactionIds } from "../../utils/localStorage"


// importing Apollo hook and mutation
import { ADD_TRANSACTION } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";


const Dashboard = () => {

    //getting the user data for user firstname.
    const { data } = useQuery(GET_ME);
    let userData = data?.me || {};


    // create state to hold saved transaction id values

    const [saveTransactionIds, setSaveTransactionIds] = useState(getTransactionIds());

    // set up useEffect hook to save `TransactionIds` list to localStorage on component unmount

    // useEffect(() => {
    //     return () => saveTransactionIds(saveTransactionIds);
    // });

    //setting up the ADD_TRANSACTION Mutation

    const [addTransaction] = useMutation(ADD_TRANSACTION)


    // this is the input value of the forms
    const [transactionFormData, setTransactionFormData] = useState(
        { Description: '', Amount: '', Categories: '', Date: '' })


    // handles the input change 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTransactionFormData({ ...transactionFormData, [name]: value });
    };


    // the is handleSubmit is for the add button at the end of the page.
    const handleAddTransaction = async (event) => {
        event.preventDefault();


        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        // getting the inputs and seperating them so that we can parse float the amount

        const Amount = parseFloat(parseFloat(transactionFormData.Amount).toFixed(2));
        const Description = transactionFormData.Description;
        const Categories = transactionFormData.Categories;
        const Date = transactionFormData.Date;

        if (!handleInputChange) {
            return false;
        }


        try {
            console.log("Input variables:", { Description, Amount, Categories, Date });
            const response = await addTransaction({
                variables: { input: { Description, Amount, Categories, Date } }
            });

            console.log("Raw response:", response);

            if (!response.data) {
                throw new Error('something went wrong!');
            }

            console.log("Transaction added successfully:", response.data);
        } catch (err) {
            console.error("Error adding transaction:", err);
        }


        setTransactionFormData({
            Description: '',
            Amount: '',
            Categories: '',
            Date: ''
        })
    };




    // this is the react and material ui components that are rendered
    return (
        <Container maxWidth="md" sx={{ mt: 15, textAlign: "center" }}>

            <Box component="main" sx={{ p: 2, border: '1px solid grey' }}>

                {/* The Budget total  */}
                <Box component="div" sx={{ textAlign: 'center', m: 2 }}>
                    <Typography variant="h4">
                        {`Hello, ${userData.firstName} this is your current budget:`}

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
                <Box component="form" onSubmit={handleAddTransaction} sx={{ textAlign: "center" }}>

                    <Grid container spacing={2}>

                        {/* Description input box */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ width: 300 }}
                            >
                                <InputLabel>Description</InputLabel>
                                <OutlinedInput
                                    value={transactionFormData.Description}
                                    onChange={handleInputChange}
                                    name="Description"
                                    id="description"
                                    label="description"

                                />
                            </FormControl>
                        </Grid>

                        {/* Amount inputbox */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ width: 300 }}
                            >
                                <InputLabel>Amount</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    step={0.01}
                                    value={transactionFormData.Amount}
                                    onChange={handleInputChange}
                                    name="Amount"
                                    id="amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="amount"

                                />
                            </FormControl>
                        </Grid>
                        {/* Select drop down Category */}
                        <Grid item xs={12} sm={6}>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="Categories"
                                    id="category-select"
                                    value={transactionFormData.Categories}
                                    label="Category"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={"Food"}>Food</MenuItem>
                                    <MenuItem value={"Rent"}>Rent</MenuItem>
                                    <MenuItem value={"Income"}>Income</MenuItem>
                                    <MenuItem value={"Utilities"}>Utilities</MenuItem>
                                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Date Method dropdown*/}
                        <Grid item xs={12} sm={6}>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel shrink={true} >Date</InputLabel>
                                <OutlinedInput
                                    type="date"
                                    id="date-select"
                                    name="Date"
                                    value={transactionFormData.Date}
                                    label="Date"
                                    onChange={handleInputChange}>


                                </OutlinedInput>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* Add button to add transactions */}

                    <Button type="submit" variant="contained" sx={{ m: 2 }}
                        disabled={!(transactionFormData.Description && transactionFormData.Amount && transactionFormData.Categories && transactionFormData.Date)}>
                        ADD
                    </Button>

                </Box>

                {/* This is the table with all the transaction values */}
                <TransactionList />
            </Box>

        </Container>
    );
};

export default Dashboard;

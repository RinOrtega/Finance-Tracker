import { useState, useEffect } from "react";
import TransactionList from "./TransactionList";
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
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import { useMutation, useQuery } from "@apollo/client";
// importing Apollo hook and mutation
import { ADD_TRANSACTION } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
// importing the auth and localStorage
import Auth from "../../utils/auth";
import { saveTransactionIds, getTransactionIds } from "../../utils/localStorage";





const Dashboard = () => {
    const { loading, error, data } = useQuery(GET_ME);

    // create state to hold saved transaction id values
    const [savedTransactionIds, setSavedTransactionIds] = useState(getTransactionIds());
    // set up useEffect hook to save `Transaction._id` list to localStorage on component unmount
    useEffect(() => {
        return () => {
            saveTransactionIds(savedTransactionIds); // Assuming saveTransactionIds is a function that saves to localStorage
        };
    }, [savedTransactionIds]);


    //setting up the ADD_TRANSACTION Mutation
    const [addTransaction] = useMutation(ADD_TRANSACTION);

    // this is the input value of the forms
    const [transactionFormData, setTransactionFormData] = useState({
        Description: '',
        Amount: '',
        Categories: '',
        Date: dayjs(),// Initialize Date with current date using dayjs
    });

    // handles the input change 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTransactionFormData({ ...transactionFormData, [name]: value });
    };
    // handles the date input
    const handleDateChange = (newValue) => {
        setTransactionFormData({ ...transactionFormData, Date: newValue });
    };


    // the is handleSubmit is for the add button at the end of the page.
    const handleAddTransaction = async (event) => {
        event.preventDefault();

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        const amountValue = transactionFormData.Amount.trim();

        if (!amountValue) {
            console.error("Amount is empty or invalid:", transactionFormData.Amount);
            return;
        }

        // Define expense categories
        const expenseCategories = ["Food", "Rent", "Utilities", "Entertainment", "Other"];
        // Determine whether the category is an expense or income
        const isExpense = expenseCategories.includes(transactionFormData.Categories);
        


        // Adjust amount based on category
        if (isExpense) {
            transactionFormData.Amount = -Math.abs(transactionFormData.Amount); // Ensure amount is negative for expenses
        } else {
            transactionFormData.Amount = Math.abs(transactionFormData.Amount); // Ensure amount is positive for income
        }
        // getting the inputs and seperating them so that we can parse float the amount
        const Amount = parseFloat(parseFloat(transactionFormData.Amount).toFixed(2));

        const Description = transactionFormData.Description;
        const Categories = transactionFormData.Categories;
        const Date = transactionFormData.Date.toISOString(); // Ensure date is in ISO format

        //uses the addTransaction mutation
        try {
            const response = await addTransaction({
                variables: { input: { Description, Amount, Categories, Date } }
            });

            if (!response.data || !response.data.addTransaction) {
                throw new Error("Transaction creation failed.");
            }

            console.log("Transaction added successfully:", response.data);

            //Update savedTransactionIds and save to localStorage
            const newTransactionId = response.data.addTransaction._id
            const updatedTransactionIds = [...savedTransactionIds, newTransactionId];
            setSavedTransactionIds(updatedTransactionIds);
        } catch (err) {
            console.error("Error adding transaction:", err);
        }
        // resetting the input form to empty 
        setTransactionFormData({
            Description: '',
            Amount: '',
            Categories: '',
            Date: dayjs(), // Reset Date to current date using dayjs
        });
    };
    if (loading) return <Typography color="primary" sx={{ mt: 15, textAlign: "center" }} variant="h6">Loading...</Typography>;
    if (error) {
        console.error("Error fetching data:", error);
        return <Typography color="error" sx={{ mt: 15, textAlign: "center" }}>Error fetching data!</Typography>;
    }

    const userData = data?.me || {};
    const transactions = userData.transactions;

    // Calculate total balance
    const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.Amount, 0);


    // this is the react and material ui components that are rendered
    return (
        <Container maxWidth="md" sx={{ mt: 15}}>
            <Box component="main" sx={{ p: 2, border: '1px solid grey' }}>
                {/* The Budget total  */}
                <Box component="div" sx={{ textAlign: 'center', m: 2 }}>
                    <Typography variant="h4">
                        {`Hello, ${userData.firstName} this is your current budget:`}
                    </Typography>
                    {/* This is the total budget */}
                    <Typography variant="h3" fontFamily="monospace" color="primary">
                        ${totalBalance.toFixed(2)}
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleAddTransaction} sx={{ textAlign: "center" }}>
                    {/* Description input box */}
                    <Grid container spacing={2}justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ width: 300 }}>
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
                        <Grid item xs={12} sm={6} >
                            <FormControl fullWidth sx={{ width: 300 }}>
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
                        <Grid item xs={12} sm={6} >
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
                        <Grid item xs={12} sm={6} >
                            <FormControl fullWidth sx={{ width: 300 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date"
                                        value={transactionFormData.Date}
                                        onChange={handleDateChange}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* Add button to add transactions */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ m: 1 }}
                        disabled={!(transactionFormData.Description && transactionFormData.Amount && transactionFormData.Categories && transactionFormData.Date)}
                    >
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

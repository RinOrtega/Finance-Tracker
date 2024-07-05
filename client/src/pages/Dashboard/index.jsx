import { useState } from "react";
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




const Tracker = () => {

    // these are the use states for the input boxes
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('');
    const [payment, setPayment] = useState('')

    // this are the select box handle changes for category and paymentmwthod
    const CategoryHandleChange = (event) => {
        setCategory(event.target.value);
    };


    const PaymentHandleChange = (event) => {
        setPayment(event.target.value);
    };


    // the is handleSubmit is for the add button at the end of the page.
    const handleSubmit = (event) => {
        event.preventDefault();

        setDescription("");
        setAmount("");
        setCategory("");
        setPayment("");
    };


 // this is the react and material ui components that are rendered
    return (
        <Container maxWidth="md" sx={{ mt:15, textAlign:"center"}}>

            <Box component="main" sx={{p: 2, border: '1px solid grey' }}>

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
                                    value={description} variant="filled"
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
                                    value={amount}
                                />
                            </FormControl>

                        </Box>
                        {/* Select drop down Category */}
                        <FormControl sx={{ width: 300, m: 2 }}>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-select"
                                value={category}
                                label="Category"
                                onClick={CategoryHandleChange}
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
                            <InputLabel id="payment-label">Payment Method</InputLabel>
                            <Select
                                labelId="payment-label"
                                id="payment-select"
                                value={payment}
                                label="Payment"
                                onChange={PaymentHandleChange}>

                                <MenuItem >Credit card</MenuItem>
                                <MenuItem >Cash</MenuItem>
                                <MenuItem >Bank transfer</MenuItem>

                            </Select>
                        </FormControl>

                        {/* Add button to add transactions */}
                        <Box component="div" sx={{mb:2}}>
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

export default Tracker;

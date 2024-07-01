import { useState } from "react";
import TransactionList from "./TransactionList"
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/Menu";
import PropTypes from 'prop-types';
import Button from "@mui/material/Button"

import Box from '@mui/material/Box';




const Tracker = () => {


    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('');
    const [payment, setPayment] = useState('')


    const CategoryHandleChange = (event) => {
        // setCategory(event.target.value);
    };


    const PaymentHandleChange = (event) => {
        // setPayment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTransaction = {
            // userId:
            // date:
            // description:
            //amount: parseFloat(amount)
            //category:
            //paymentMethod:
        };

    //addTransaction(newTransaction);
        setDescription("");
        setAmount("");
        setCategory("");
        setPayment("");
    };

    return (
        <Container sx={{ border: '1px dashed grey' }}>

            <Box component="main" sx={{ p: 2, border: '1px solid grey' }}>

                {/* The Budget total  */}
                <Box component="div" sx={{ textAlign: 'center', m: 2 }}>
                    <Typography variant="h4">
                        Hello, "user" this is your current budget:

                    </Typography>
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
                    <div>
                        <div>
                            {/* Description box */}
                            <TextField id="outlined-basic" label="Description" variant="outlined"
                            
                            sx={{ width: 300, m: 2 }} />

                            {/* Amount box */}
                            <FormControl fullWidth sx={{ width: 300, m: 2 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>

                        </div>
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

                        <FormControl sx={{ width: 300, m: 2 }} >
                            <InputLabel id="payment-label">Payment Method</InputLabel>
                            <Select
                                labelId="payment-label"
                                id="payment-select"
                                value={payment}
                                label="Payment"
                                onChange={(e) => setPayment(e.target.value)}>
                                <MenuItem >Credit card</MenuItem>
                                <MenuItem >Cash</MenuItem>
                                <MenuItem >Bank transfer</MenuItem>

                            </Select>
                        </FormControl>
                        <div>
                            <Button type="submit" variant="contained">
                                ADD
                            </Button>
                        </div>
                    </div>
                </Box>

                {/* This is the table with all the transaction values */}
                <TransactionList />
            </Box>

        </Container>
    );
};

export default Tracker;

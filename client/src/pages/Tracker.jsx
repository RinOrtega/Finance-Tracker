import React from "react";

import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/Menu";
import Button from "@mui/material/Button"
import Box from '@mui/material/Box';

const Tracker = () => {

    return (
        <Container maxWidth="lg" flex>
            
            <Box component="main" sx={{textAlign:'center'}}>

{/* The Budget total  */}
                <Box component="div">
                    <h1>$400<span>.00</span></h1>
                </Box>

{/* All the input for the transactions */}
                <Box component="form">
                    <div>
                        {/* Description box */}
                        <TextField fullWidth id="outlined-basic" label="Description" variant="outlined" />

                        {/* Amount box */}
                        <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>


                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="Categories">Category</InputLabel>
                            <Select
                                labelId="Categories"
                                id="categories"
                                value=""
                                label="category"
                                onChange=""
                            >
                                <MenuItem >Expense</MenuItem>
                                <MenuItem >Income</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="paymentMethods">Payment Method</InputLabel>
                            <Select
                                labelId="paymentMethods"
                                id="paymentMethods"
                                value=""
                                label="paymentMethods"
                                onChange=""
                            >
                                <MenuItem >Credit card</MenuItem>
                                <MenuItem >Bank transfer</MenuItem>

                            </Select>
                        </FormControl>

                        <Button variant="contained" sx={{ mt: 3 }}>ADD</Button>
                    </div>
                </Box>
            </Box>

        </Container>
    );
};

export default Tracker;

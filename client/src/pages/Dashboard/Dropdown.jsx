import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    
    const [category, setCategory] = useState('');



    const CategoryHandleChange = (event) => {
        setCategory(event.target.value);
    };


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        
        
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
        
        
        </Box>

    );
}

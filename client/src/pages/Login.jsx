import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';




//importing the useMutation and LOGIN_USER
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';



// This is the copyright at the bottom of the page

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                Finance Tracker
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Login = () => {

    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [open, setOpen] = useState(false);

    // declaring the LOGIN_USER with useMutation
    const [login ] = useMutation(LOGIN_USER);



    const handleChange = (event) => {
        const { name, value } = event.currentTarget;

        setUserFormData({ ...userFormData, [name]: value });
    };


    // this is to handle the submit of user 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        // use the login function declared using mutation
        try {
            const response = await login({
                variables: { ...userFormData }
            });

            if (!response.data) {
                throw new Error('something went wrong!');
            }
           
            const { token, user } = await response.data.login;
            console.log(user);
            Auth.login(token);
        } catch (err) {
            console.error(err);
            setOpen(true);
        }
        // clear form values
        setUserFormData({
            email: '',
            password: '',
        });
    };



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            {/* This is the box that includes the title of the login box */}
            <Box
                sx={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* This is the title and icon */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                {/*This box contains ther form to enter email and password  */}
                <Box component="form" noValidate  onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                    <Collapse in={open}>
                        <Alert action={
                            <IconButton onClick={() => { setOpen(false); }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>} sx={{ mb: 2 }}
                            variant='filled' severity='error'>
                            Something went wrong with your login credentials!
                        </Alert>
                    </Collapse>
                    <TextField
                        margin="normal"
                        value={userFormData.email}
                        onChange={handleChange}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus

                    />

                    <TextField
                        margin="normal"
                        required
                        onChange={handleChange}
                        value={userFormData.password}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {/* SHOULD WE KEEP THIS  */}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    {/* The submit button */}
                    <Button
                        disabled={!(userFormData.email && userFormData.password)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* SHOULD WE ADD THIS */}
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* Copyright component that is at the top of this doc */}
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};


export default Login;
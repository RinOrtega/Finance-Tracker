import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

// import apollo hook and add user mutation
import { useMutation } from '@apollo/client';
import { ADD_USER } from "../utils/mutations";

import Auth from '../utils/auth';


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

const SignUp = () => {

    // declaring the user and useMutation

    const [addUser] = useMutation(ADD_USER);

    // set initial form state
    const [userFormData, setUserFormData] = useState({
        firstName: '', lastName: '', email: '', password: ''
    });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [open, setOpen] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        // using the addUser function from mutation
        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
            setOpen(true);
        }

        setUserFormData({
            firstName: '', 
            lastName: '',
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            {/* box with title and icon */}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                {/* box with first name lastname wmail and password */}
                <Box component="form" noValidate validated={validated} onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Collapse in={open}>
                        <Alert action={
                            <IconButton onClick={() => { setOpen(false); }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>} sx={{ mb: 2 }}
                            variant='filled' severity='error'>
                            Something went wrong with your login credentials!
                        </Alert>
                    </Collapse>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                value={userFormData.firstName}
                                onChange={handleChange}
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                value={userFormData.lastName}
                                onChange={handleChange}
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={userFormData.email}
                                onChange={handleChange}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={userFormData.password}
                                onChange={handleChange}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>

                    </Grid>
                    {/* this is the sign up button */}
                    <Button
                        disabled={!(userFormData.email && userFormData.password)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default SignUp;
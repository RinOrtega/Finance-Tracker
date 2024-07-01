import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"

// importing material ui components

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const logoStyle = {
    width: '50px',
    height: 'auto',
    cursor: 'pointer',
};


const Navbar = ({ mode, toggleColorMode }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        {/* Box with the logo and the page hyperlinks */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 2,
                            }}
                        >
                            <Link to="/">
                                <img
                                    src={logo}
                                    style={logoStyle}
                                    alt="logo of FT"
                                />
                            </Link>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 5 }}>
                                <Link to="/dashboard">
                                    <MenuItem sx={{ py: '6px', px: '12px' }}  >
                                        <Typography variant="body2" color="text.primary">
                                            Dashboard
                                        </Typography>

                                    </MenuItem>
                                </Link>
                                <Link to="/me">
                                    <MenuItem sx={{ py: '6px', px: '12px' }}  >
                                        <Typography variant="body2" color="text.primary">
                                            Profile
                                        </Typography>

                                    </MenuItem>
                                </Link>

                            </Box>
                        </Box>

                        {/* buttons on the rigt side of the navbar */}
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 1,
                                alignItems: 'center'
                            }}
                        >
                            {/* This is the dark mode toggle component */}

                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                            {/* These are the Login and the Sign up buttons. */}
                            <Link to="/login">
                                <Button
                                    color="primary"
                                    variant="text"
                                    size="small"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>

                            {/* This is a drawer component that will be used in smaller screens to show the menu buttons above and the pages */}
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                    </Box>
                                    <Link to="/dashboard">
                                        <MenuItem  >
                                            Dashboard
                                        </MenuItem>
                                    </Link>

                                    <Link to="/me">
                                        <MenuItem  >
                                            Profile
                                        </MenuItem>
                                    </Link>

                                    <Divider />
                                    < Link to="/signup">
                                        <MenuItem>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                component="a"
                                                href="../pages/signup"
                                                target="_blank"
                                                sx={{ width: '100%' }}
                                            >
                                                Sign up
                                            </Button>
                                        </MenuItem>
                                    </Link>
                                    <Link to="/login">
                                        <MenuItem>
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                component="a"
                                                href="../pages/login"
                                                target="_blank"
                                                sx={{ width: '100%' }}
                                            >
                                                Login
                                            </Button>
                                        </MenuItem>
                                    </Link>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};




export default Navbar;
import React from "react";
import SplineRobot from "../components/Robot"

import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
const Home = () => {

    return (
        <Container maxWidth="lg">
            <Box >
                <Typography sx={{textAlign:'center'}}>
                    <h1 className="">Welcome!</h1>
                </Typography>
            </Box>
            <SplineRobot/>
        </Container>
    );
};

export default Home;

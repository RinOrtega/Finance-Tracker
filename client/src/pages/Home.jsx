import React from "react";
import SplineRobot from "../components/Robot"

import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
const Home = () => {

    return (
        <Container maxWidth="lg">
            <Box component="section" sx={{  }}>
                
                <Typography sx={{textAlign:'center'}}>
                    <h1 className="">Welcome!</h1>
                </Typography>
                <SplineRobot/>
            </Box>
        </Container>
    );
};

export default Home;

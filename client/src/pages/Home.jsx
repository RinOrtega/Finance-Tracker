import React from "react";
import SplineRobot from "../components/Robot"

import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
const Home = () => {

    return (

            <Box component="section" sx={{ p:10 }}>
                
                <Typography sx={{textAlign:'center', pointerEvents:'none'}}>
                    <h1 className="">Welcome!</h1>
                </Typography>
                <Box sx={{borderRadius:3, border: "5px, solid, black" }}>
                <SplineRobot/>
                </Box>
            </Box>

    );
};

export default Home;

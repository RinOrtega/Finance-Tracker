import SplineRobot from "../components/Robot"
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
const Home = () => {

    return (

        <Box component="main" sx={{ pt: 15, pb:15 }}>
            <Typography variant="h2" sx={{ textAlign: 'center', pointerEvents: 'none' }}>
                Welcome!
            </Typography>
            <Box sx={{ m: 5, borderRadius: 3, border: "5px, solid, black" }}>
                <SplineRobot />

            </Box>
            <Typography variant="h6" sx={{ textAlign: 'center', pointerEvents: 'none' }}>
            Find the balance between your needs, wants and savings.
            </Typography>
        </Box>

    );
};

export default Home;

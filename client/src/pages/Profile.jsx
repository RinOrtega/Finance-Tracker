
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// importing Apollo hook and mutation
import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProfilePage = () => {
    const { loading, error, data } = useQuery(GET_ME);


    if (loading) {
        return <Typography color="primary" sx={{ mt: 15, textAlign: "center" }} variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography color="Error" sx={{ mt: 15, textAlign: "center" }} variant="h6">Error loading user.</Typography>;
    }

    if (!data || !data.me || !data.me.transactions) {
        return <Typography color="Error" sx={{ mt: 15, textAlign: "center" }} variant="h6">No data found.</Typography>;
    }

    const userData = data?.me || {};
    const transactions = userData.transactions;

    // Calculate totals for each category
    const categoryTotals = transactions.reduce((acc, transaction) => {
        const { Categories, Amount } = transaction;
        Categories.forEach(Category => {
            const categoryType = Category.categoryType;
            if (!acc[categoryType]) {
                acc[categoryType] = 0;
            }
            acc[categoryType] += Amount;
        });
        
        return acc;
    }, {});

    // Transform the data for the pie chart
    const pieData = Object.keys(categoryTotals).map(category => ({
        name: category,
        value: Math.abs(categoryTotals[category]) // Use absolute value to avoid negative amounts in the pie chart
    }));

    // Colors for the pie chart
    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'];

    return (
        <Container sx={{  pt: 15,pb:15 }}>
            <Paper sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Avatar src="" sx={{ width: 100, height: 100, mb: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        {`${userData.firstName} ${userData.lastName}`}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {userData.email}
                    </Typography>
                </Box>
                {/* Piechart */}
                <Grid container spacing={1} sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} md={6} lg={12} sx={{ display: 'flex'}}>
                    <Box sx={{ p: 4, width:1200, height: 500 }}>
                                <ResponsiveContainer width="100%" height="100%" >
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            fill="#8884d8"
                                            dataKey="value"
                                            nameKey="name"
                                            label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
                                        <Legend layout="horizontal" verticalAlign="top" align="center" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProfilePage;

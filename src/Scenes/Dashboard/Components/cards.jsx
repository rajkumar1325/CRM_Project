import { useState, useEffect } from 'react';
import { Box, Typography, Paper, colors, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const Cards = () => {
    // This is the static data. In a real application, you would fetch this from your Spring Boot API.
    const mockData = {
        totalLeads: 120,
        activeDeals: 75,
        closedDeals: 45,
        profit: '₹ 1.56M',
        conversionRate: '37.5%', // (closedDeals / activeDeals) * 100
    };

    const [data, setData] = useState(mockData);
    const [loading, setLoading] = useState(true);


    // for using theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        // Simulate an API call
        const fetchData = async () => {
            // Here you would use Axios or fetch to get data from your Spring Boot backend
            // const response = await axios.get('/api/v1/leads/overview');
            // setData(response.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <Box sx={{ p: 2 }}>Loading...</Box>;
    }

    const cards = [
        { title: 'Total Leads', value: data.totalLeads },
        { title: 'Active Deals', value: data.activeDeals },
        { title: 'Closed Deals', value: data.closedDeals },
        { title: 'Conversion Rate', value: data.conversionRate },
        { title: 'Profit Earned', value: data.profit },
    ];

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' },
                gap: 2,
                p: 2,

                // // toggle dark mode
                // backgroundColor:
                //     theme.palette.mode === "dark"
                //         ? colors.primary[400]
                //         : colors.gray[800],
            }}
        >
            {cards.map((card, index) => (
                <Paper
                    key={index}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 3,
                        
                        backgroundColor: 
                            theme.palette.mode === "dark"  // toggle dark mode
                                ? colors.primary[400]
                                : colors.gray[800],


                    }}
                >
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {card.title}
                    </Typography>
                    <Typography
                        variant="h3"
                        component="div"
                        fontWeight="bold"

                        // toggle dark mode
                        sx={{
                            color:
                                theme.palette.mode === "dark"
                                    ? colors.redAccent[900]
                                    : colors.blueAccent[100],
                        }}
                    >
                        {card.value}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default Cards;

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

// The mock data is outside the component to prevent re-creation on every render.
const mockData = {
    totalLeads: 120,
    activeDeals: 75,
    closedDeals: 45,
    profit: '₹ 1.56M',
    conversionRate: '37.5%',
};

const Cards = () => {
    // Corrected variable name to avoid conflict
    const theme = useTheme();
    const colorTokens = tokens(theme.palette.mode);

    // Initializing state with mockData. Removed unnecessary loading state for mock data.
    const [data] = useState(mockData);

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
                        // Corrected: Set the card background color based on the theme mode
                        backgroundColor: theme.palette.mode === "dark" 
                            ? colorTokens.primary[400] 
                            : colorTokens.gray[800],
                    }}
                >
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {card.title}
                    </Typography>
                    <Typography
                        variant="h3"
                        component="div"
                        fontWeight="bold"
                        sx={{
                            // Corrected: Set the text color based on the theme mode and using the correct variable
                            color: theme.palette.mode === "dark" 
                                ? colorTokens.redAccent[900] 
                                : colorTokens.blueAccent[100],
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
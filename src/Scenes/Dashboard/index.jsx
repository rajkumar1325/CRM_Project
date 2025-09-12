// src/Scenes/Dashboard/index.jsx
import{ useMemo } from 'react';
import { Box } from "@mui/material";
import Header from '../../GlobalComponents/Header';
import Cards from "./Components/cards";
import PieChart from "./Components/PieChart.jsx";
import SalesChart from "./Components/SalesChart"; // Import the sales-chart
import { useOutletContext } from 'react-router-dom';


const Dashboard = () => {
    // const { searchQuery, leads } = useOutletContext();
    // const filteredLeads = useMemo(() => {
    //     if (!searchQuery) {
    //         return leads;
    //     }
    //     const lowerCaseQuery = searchQuery.toLowerCase();
    //     return leads.filter(lead =>
    //         lead.name.toLowerCase().includes(lowerCaseQuery) ||
    //         lead.company.toLowerCase().includes(lowerCaseQuery) ||
    //         lead.status.toLowerCase().includes(lowerCaseQuery)
    //     );
    // }, [leads, searchQuery]);

    return (
        <Box m="20px">
            <Box mt={'10px'} ml={'20px'} display={"flex"} justifyContent={"space-between"} alignItems={'center'}>
                <Header title='DASHBOARD' subTitle="Welcome to the Dashboard" />
            </Box>
            <Box>
                <Cards  />
            </Box>


            <Box display="flex" flexDirection="row" height={'100vh'}>
                <Box flex={1} width="100%" height={'60%'} sx={{ p: '20px' }}>
                    <PieChart  />
                </Box>
                <Box flex={1} width="100%" height={'60%'} sx={{ p: '20px' }} >
                    <SalesChart  />
                </Box>
            </Box>
        </Box>
    );
};
export default Dashboard;











/*
                    SOME-Based info
    1. 

*/
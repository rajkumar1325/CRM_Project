import { useState } from 'react';
import { Box } from "@mui/material";
import Header from '../../GlobalComponents/Header';
import Cards from './Components/cards.jsx';
import PieChart from "./Components/PieChart.jsx";
import SalesChart from "./Components/SalesChart";
import CheckBox from "./Components/CheckBox.jsx";
import MeetingCall from "./Components/MeetingsCall.jsx";
import PieChartTable from './Components/PieChart.jsx'; // Import the new table component
import { MeetingRoom } from '@mui/icons-material';


const Dashboard = () => {
    const [showTable, setShowTable] = useState(false);

    const handleChartClick = () => {
        setShowTable(prev => !prev);
    };

    return (
        <Box m="20px">
            <Box mt={'10px'} ml={'20px'} display={"flex"} justifyContent={"space-between"} alignItems={'center'}>
                <Header title='DASHBOARD' subTitle="Welcome to the Dashboard" />
            </Box>
            <Box>
                <Cards />
            </Box>

            <Box display="flex" flexDirection="row" margin={'3px'}>
                <Box flex={1} margin={'1rem'}>
                    <PieChart onChartClick={handleChartClick} />
                </Box>
                <Box flex={1} margin={'1rem'}>
                    <SalesChart />
                </Box>
            </Box>

            {showTable && (
                <Box
                    sx={{
                        margin: '1em',
                        transition: 'height 0.5s ease-in-out', // Smooth transition for the table
                        overflow: 'hidden'
                    }}
                >
                    <PieChartTable />
                </Box>
            )}



            <Box display="flex" flexDirection="row" margin={'3px'}>
                <Box flex={1} margin={'1rem'} display={'contain'}>
                    <CheckBox />
                </Box>
                <Box flex={1} margin={'1rem'}>
                    <MeetingCall />
                </Box>
            </Box>


        </Box>
    );
};
export default Dashboard;

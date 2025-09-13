import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import { mockMeetingsData } from '../../../Data/mockData'; //mock data fetched

const UpcomingMeetings = () => {
    // State to hold the meetings data
    const [meetings, setMeetings] = useState([]);
    // State to manage the loading status
    const [isLoading, setIsLoading] = useState(true);
    // State to handle any potential errors
    const [error, setError] = useState(null);

    // This effect runs once when the component mounts to fetch data
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchMeetings = () => {
            // Dummy data to simulate API response
            
            
            // Simulating a network delay
            setTimeout(() => {
                try {
                    setMeetings(mockMeetingsData);
                    setIsLoading(false);
                } catch (err) {
                    setError(err.message);
                    setIsLoading(false);
                }
            }, 1000);
        };

        fetchMeetings();
    }, []);

    const theme = useTheme();

    return (
        <Box
            sx={{
                width: '100%',
                minWidth: '250px',
                // backgroundColor: 'red',
                // borderRadius: '12px',
                boxShadow: theme.shadows[4],
                padding: '40px',
                // margin: '3em',
            }}
        >
            {/* Header section */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: theme.palette.text.primary,
                }}
            >
                Upcoming Meetings
            </Typography>

            {/* Conditionally render based on loading/error state */}
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>
                    Error: {error}
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {meetings.map((meeting, index) => (
                        <React.Fragment key={meeting.id}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                py: 1,
                            }}>
                                {/* Meeting Title */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 'medium',
                                        // color: theme.palette.text.primary,
                                    }}
                                >
                                    {meeting.title}
                                </Typography>

                                {/* Date and Time */}
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            // color: theme.palette.text.primary,
                                            fontWeight: 'medium',
                                        }}
                                    >
                                        {meeting.date}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            // color: theme.palette.text.secondary,
                                        }}
                                    >
                                        {meeting.time}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Divider between meetings, except for the last one */}
                            {index < meetings.length - 1 && (
                                <Box sx={{
                                    height: '1px',
                                    // backgroundColor: theme.palette.divider,
                                    my: 1,
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default UpcomingMeetings;

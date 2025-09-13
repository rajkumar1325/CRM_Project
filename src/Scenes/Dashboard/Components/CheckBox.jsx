import React, { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { Check, CheckBox, List } from '@mui/icons-material';
import {CheckBoxData} from '../../../Data/mockData';

const Tasks = () => {
    const [tasks, setTasks] = useState(CheckBoxData); //initialise state with imported data

    // It uses the state variable "tasks" and setter "setTasks"
    const handleCheckboxChange = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <Box
            sx={{
                width: '100%',
                // maxWidth: '400px',
                minWidth: '250px',
                // backgroundColor: '#f0dcdc0d',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                // margin: '1em',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{  fontWeight: 'bold' }}>
                    Tasks
                </Typography>
                <IconButton aria-label="list-view" >
                    <List />
                </IconButton>
            </Box>


            <Box sx={{display:'flex', flexDirection:'column'}}>
                {tasks.map((task) => (
                    <FormControlLabel
                        key={task.id}
                        control={
                            <Checkbox
                                checked={task.completed}
                                onChange={() => handleCheckboxChange(task.id)}
                                sx={{
                                    // color: 'white',
                                    '&.Mui-checked': {
                                        color: '#66bb6a', // A nice green for completed tasks
                                    },
                                }}
                            />
                        }
                        label={
                            <Typography
                                variant="body1"
                                sx={{
                                    // color: 'white',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    opacity: task.completed ? 0.6 : 1,
                                    transition: 'text-decoration 0.3s, opacity 0.3s'
                                }}
                            >
                                {task.text}
                            </Typography>
                        }
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Tasks;

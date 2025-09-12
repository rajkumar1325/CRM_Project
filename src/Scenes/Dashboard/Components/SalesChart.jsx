import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography, MenuItem, Select, FormControl, useTheme } from "@mui/material";
import {tokens}  from "../../../theme";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components for a line chart.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for the sales chart. 
const salesData = {
  // Data for today's sales
  today: {
    labels: ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    data: [150, 200, 180, 250, 220],
    label: "Today's Sales",
  },
  // Data for the current month
  thisMonth: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [1500, 2000, 1800, 2500],
    label: "Sales This Month",
  },
  // Data for the current year
  thisYear: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    data: [4000, 6000, 5000, 7000, 9000, 8500, 10000],
    label: "Sales This Year",
  },
  // Data for the previous year
  previousYear: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    data: [8000, 9500, 9000, 11000],
    label: "Previous Year's Sales",
  },
  // Data for the last 5 years
  last5Years: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    data: [20000, 25000, 28000, 30000, 35000],
    label: "Sales (Previous 5 Years)",
  },
};

/**
 * SalesChart Component
 * Displays a line chart of sales data with a dropdown filter.
 */
export default function SalesChart() {
  // Access the current theme and color tokens from the global context.
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // State hook to manage the selected filter, initialized to 'thisMonth'
  const [filter, setFilter] = useState("thisMonth");
  
  // Handler function for when the dropdown value changes
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  // Prepare the data object for the chart based on the current filter state
  const chartData = {
    labels: salesData[filter].labels,
    datasets: [
      {
        label: salesData[filter].label,
        data: salesData[filter].data,
        borderColor: theme.palette.mode === 'dark' ? '#3b82f6' : '#19b26e', //line-color
        backgroundColor: theme.palette.mode === 'dark' ? '#21212c' : '#F9FAFC', //legend fill-color
        tension: 0.4, // Adds a slight curve to the line
        fill: true,
      },
    ],
  };

  // Optional: Chart options for customization
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    // Add padding to ensure labels are inside the container box.
    layout: {
      padding: {
        top: 10,
        right: 20,
        left: 20,
        bottom: 10,
      }
    },
    plugins: {
      legend: {
        position: 'top',
        // customize the legend item's appearance.
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRot',
          font: { size: 11, weight: 'bold' },
        },
      },
      title: {
        display: false,
      },
    },
    // Customize scales for better visual representation.
    scales: {
      x: {
        offset: true,
        grid: {
          display: true, // displays vertical grid lines
        },
        ticks: {
          color: theme.palette.mode ==='dark' ? '#A1A1AA' : '#4B5563', // Apply color to the labels in x-axis
        }
      },
      y: {
        grid: {
          display: true, // Shows horizontal grid lines
          color: colors.gray[400], // Apply color to y-axis grid horizontal lines
        },
        ticks: {
          color: theme.palette.mode ==='dark' ? '#A1A1AA' : '#4B5563', // Apply color to the label to y-axis
        }
      },
    },
  };


//MAIN CONTAINER/BOX

  // container-style 
  const containerStyles = {
    width: "100%",
    height: "100%",
    p: 3,
    boxShadow: 3,
    borderRadius: 2,
    // backgroundColor: colors.primary[400], 

    backgroundColor: theme.palette.mode === 'dark'? '#293347' : '#F9FAFC',

    color: colors.gray[100],
    transition: 'background-color 0.5s, color 0.5s',
  };

  return (
    <Box sx={containerStyles}>
      {/* Container for the title and dropdown menu, with responsive layout. */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
        flexWrap="wrap"
      >
        {/* Dynamic title based on the selected filter */}
        <Typography variant="h6" color="inherit" sx={{ minWidth: '150px' }}>
          {salesData[filter].label}
        </Typography>
        {/* Dropdown for selecting the time period */}
        <FormControl size="small" sx={{
          minWidth: '150px',
        }}>
          <Select
            value={filter}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Sales period filter' }}
          >
            <MenuItem value="today">Today's Sales</MenuItem>
            <MenuItem value="thisMonth">Sales This Month</MenuItem>
            <MenuItem value="thisYear">Sales This Year</MenuItem>
            <MenuItem value="previousYear">Sales Previous Year</MenuItem>
            <MenuItem value="last5Years">Previous 5 Years Sales</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* The Line chart component from react-chartjs-2 */}
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
}

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { useState } from 'react';



import Read from './GlobalComponents/typeWriter.jsx'

// Importing dashboard components
import Topbar from "./GlobalComponents/Topbar.jsx";
import Sidebar from "./GlobalComponents/Sidebar.jsx";
import Dashboard from "./Scenes/Dashboard/index.jsx";
import Leads from "./Scenes/leads/index.jsx";

const Layout = () => {
    const [theme, colorMode] = useMode();
    const [searchQuery, setSearchQuery] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false); // State is now here

    // Define dynamic widths based on the isCollapsed state
    const expandedWidth = '270px';
    const collapsedWidth = '80px';
    const sidebarWidth = isCollapsed ? collapsedWidth : expandedWidth;

    return (

        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box sx={{ display: 'flex', position: 'relative' }}>

                        {/* The Sidebar with fixed position */}
                        <Box
                            sx={{
                                width: sidebarWidth, // Dynamic width
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                height: '100vh',
                                zIndex: 1000,
                            }}
                        >
                            {/* Pass state and setter to Sidebar */}
                            <Sidebar
                                isCollapsed={isCollapsed}
                                setIsCollapsed={setIsCollapsed}
                            />
                        </Box>

                        {/* Spacer Box - Width is now dynamic */}
                        <Box sx={{ width: sidebarWidth, flexShrink: 0 }} />

                        {/* Main Content */}
                        <main className='content' style={{ flexGrow: 1, overflowY: 'auto' }}>
                            <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                            <Outlet context={{ searchQuery }} />
                        </main>

                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider>



    {/* TYpe-writer */}
            {/* <Box>
                <Read />
            </Box> */}

        </>
    );
};

// 2. Define the router with nested routes
const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/leads',
                element: <Leads />,
            },
            // {
            //   path: '/contacts',
            //   element: <Contacts />,
            // },
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from 'react';

// Importing dashboard components
import Topbar from "./Scenes/Global/Topbar";
import Sidebar from "./Scenes/Global/Sidebar";
import Dashboard from "./Scenes/Dashboard/index.jsx";
import Leads from "./Scenes/leads/index";


const Layout = () => {
    const [theme, colorMode] = useMode();

    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>
                    <Sidebar />
                    <main className='content'>
                        {/* Pass the search state and setter to the Topbar */}
                        <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                        {/* The Outlet component renders the nested routes, passing the search query as a prop to the leads*/}
                        <Outlet context={{ searchQuery }} />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
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
            //   path: '/contacts',
            //   element: <Contacts />,
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

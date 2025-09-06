import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"; //built-in library for making sidebar
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";

// importing icons
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { RiAdminFill } from "react-icons/ri";


// Item component for reuse
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <MenuItem
            active = {selected === title}
            style={{
                color: isActive ? colors.greenAccent[500] : colors.gray[500],
            }}

            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

// Main Sidebar component
const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box
            sx={{

                // over-riding CSS of the library (that I have inported)

                "& .pro-sidebar": {
                    height:'100vh',
                    position:'sticky',
                },
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`, //sidebar color
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb",
                },
                // Updated CSS to target the custom active class
                "& .pro-menu-item.active": {
                    color: `${colors.greenAccent[500]} !important`,
                },
            }}
        >

    {/* When menu sidebar is in Closed state */}

            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <RiAdminFill /> : undefined}  //icon change
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.gray[100],
                        }}
                    >

    {/* When menu sidebar is in Expanded state */}
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.gray[100]}>
                                    ADMINS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">

                            {/* image */}
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`https://placehold.co/100x100/A3A3A3/FFFFFF?text=ADMIN`}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>


                            {/* Name/Owner */}
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.gray[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Raj Kumar
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}



                {/* MENU ITEMS AND ROUTING*/}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                        />
                        <Item
                            title="Leads"
                            to="/leads"
                            icon={<PeopleOutlinedIcon />}
                        />
                        <Item
                            title="Customers"
                            to="/contacts"
                            icon={<ContactsOutlinedIcon />}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
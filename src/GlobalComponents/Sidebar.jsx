import { useState } from "react";
// Removed: import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// Removed: import "react-pro-sidebar/dist/css/styles.css";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../theme";

// importing icons
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { RiAdminFill } from "react-icons/ri";


// Item component for reuse
const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
    const colors = tokens('dark'); // Assuming 'dark' for the color token
    const location = useLocation();
    const isActive = location.pathname === to;

    const itemStyle = {
        padding: "5px 35px 5px 20px",
        color: isActive ? colors.greenAccent[500] : colors.gray[500],
        transition: "color 0.3s ease-in-out",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
    };

    const linkStyle = {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        color: 'inherit'
    }

    const iconStyle = {
        color: 'inherit',
        fontSize: '24px',
    }

    const textStyle = {
        marginLeft: '15px',
        color: 'inherit',
        fontWeight: 'bold'
    }

    // FIX: Using blueAccent[300] which is a valid token from the theme
    const hoverColor = colors.blueAccent[300];

    return (
        <div 
            style={itemStyle} 
            onMouseOver={e => e.currentTarget.style.color = hoverColor} 
            onMouseOut={e => e.currentTarget.style.color = itemStyle.color}
        >
            <Link to={to} style={linkStyle}>
                <div style={iconStyle}>
                    {icon}
                </div>
                {!isCollapsed && (
                    <div style={textStyle}>
                        {title}
                    </div>
                )}
            </Link>
        </div>
    );
};

// Main Sidebar component
const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const colors = tokens('dark'); // Assuming 'dark' for the color token
    
    const sidebarStyles = {
        height: '100vh',
        backgroundColor: colors.primary[400],
        transition: 'width 0.3s ease-in-out',
        overflow: 'hidden',
        width: isCollapsed ? '80px' : '270px'
    };

    const headerStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        color: colors.gray[100]
    };
    
    const userInfoStyles = {
        marginBottom: "25px",
        textAlign: "center"
    };

    return (
        <div style={sidebarStyles}>
            <div>
                {/* Header for the collapsed/uncollapsed state */}
                <div style={headerStyles}>
                    {!isCollapsed && (
                        <h3 style={{ color: colors.gray[100], margin: 0 }}>
                            ADMINS
                        </h3>
                    )}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.gray[100] }}
                    >
                        {isCollapsed ? <RiAdminFill /> : <MenuOutlinedIcon />}
                    </button>
                </div>

                {/* User Info (only visible when uncollapsed) */}
                {!isCollapsed && (
                    <div style={userInfoStyles}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img
                                alt="profile-user"
                                width="100px"
                                height="100px"
                                src={`https://placehold.co/100x100/A3A3A3/FFFFFF?text=ADMIN`}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h2 style={{ color: colors.gray[100], fontWeight: "bold", margin: "10px 0 0 0" }}>
                                Raj Kumar
                            </h2>
                            <h5 style={{ color: colors.greenAccent[500], margin: 0 }}>
                                Admin
                            </h5>
                        </div>
                    </div>
                )}

                {/* Menu Items */}
                <div>
                    <Item
                        title="Dashboard"
                        to="/"
                        icon={<HomeOutlinedIcon />}
                        isCollapsed={isCollapsed}
                    />
                    <Item
                        title="Leads"
                        to="/leads"
                        icon={<PeopleOutlinedIcon />}
                        isCollapsed={isCollapsed}
                    />
                    <Item
                        title="Customers"
                        to="/contacts"
                        icon={<ContactsOutlinedIcon />}
                        isCollapsed={isCollapsed}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../theme";
import { useMediaQuery } from "@mui/material"; // ADDED: import useMediaQuery

// importing icons
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { RiAdminFill } from "react-icons/ri";
import { HiOutlineSquares2X2 } from "react-icons/hi2"; //lead
import { FaUserCheck } from "react-icons/fa"; //customers
import { MdOutlineSupportAgent } from "react-icons/md"; //support
import { FaHandshake } from "react-icons/fa"; //deals
import { FaChartLine } from "react-icons/fa"; //report
import { FaClipboardList } from "react-icons/fa"; //activities




// Item component/css for reuse
const Item = ({ title, to, icon, isCollapsed }) => {
    const colors = tokens('dark'); // Assuming 'dark' for the color token
    const location = useLocation();
    const isActive = location.pathname === to;

    const itemStyle = {
        padding: "5px 35px 5px 20px",
        color: isActive ? colors.greenAccent[500] : colors.gray[500], //display activeness
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


    // useMediaQuery to set collapse/open according to display size
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    useEffect(() => {
        setIsCollapsed(isSmallScreen);
    }, [isSmallScreen]);


    const colors = tokens('dark'); // Assuming 'dark' for the color token

    const sidebarStyles = {
        height: '100vh',
        // backgroundColor: colors.primary[900],
        backgroundImage: 'linear-gradient(to bottom, #2F4F4F, #1C2B2B)', //gradient-color
        transition: 'width 0.3s ease-in-out',
        overflow: 'hidden',
        width: isCollapsed ? '60px' : '250px',
        // border: '2px solid red'
    };


    // sidebar-header-style
    const headerStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        color: '#fff',
        // border: '2px solid red'
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
                        <h3 style={{ color: '#ffffff', margin: 0 }}>
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
                            <h2 style={{ color: '#ffffff', fontWeight: "bold", margin: "10px 0px 60px auto" }}>
                                Raj Kumar
                            </h2>

                            {/* <h5 style={{ color: '#cccccc', margin: 0 }}>
                                Admin
                            </h5> */}
                        </div>
                    </div>
                )}

                {/* Menu Items */}
                <div>
                    <Item
                        title="Home"
                        to="/"
                        icon={<HomeOutlinedIcon />}
                        isCollapsed={isCollapsed}
                    />
                    <Item
                        title="Leads"
                        to="/leads"
                        icon={<HiOutlineSquares2X2 />}
                        isCollapsed={isCollapsed}
                    />

                    <Item
                        title="Customers"
                        to="#"
                        icon={<FaUserCheck />}
                        isCollapsed={isCollapsed}
                    />

                    <Item
                        title="Support"
                        to="#"
                        icon={<MdOutlineSupportAgent />}
                        isCollapsed={isCollapsed}
                    />

                    <Item
                        title="Deals"
                        to="#"
                        icon={<FaHandshake />}
                        isCollapsed={isCollapsed}
                    />

                    <Item
                        title="Reports"
                        to="#"
                        icon={<FaChartLine />}
                        isCollapsed={isCollapsed}
                    />

                    <Item
                        title="Task and Activities"
                        to="#"
                        icon={<FaClipboardList />}
                        isCollapsed={isCollapsed}
                    />




                </div>
            </div>
        </div>
    );
};

export default Sidebar;

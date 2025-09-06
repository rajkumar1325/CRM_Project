import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";


// adding buttons
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";





const Topbar = ({searchQuery, setSearchQuery}) => {   //passing props as a input to search bar, so that it can filter out.
    // making variables
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const colorMode = useContext(ColorModeContext);

    return (
        <Box display={"flex"} justifyContent={"space-between"} p={2}>

            {/* SearchBar */}
            <Box display={"flex"}
                backgroundColor={colors.primary[400]}
                // border={'2px solid #212121'}
                borderRadius={"3px"}


                //toggle dark mode
                sx={{
                    backgroundColor: theme.palette.mode === 'dark'? colors.primary[400] : colors.primary[100],
                }}

            >
                <InputBase sx={{ ml: 2, flex: 1 }} 
                placeholder="Search Here" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/> 

                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>



            </Box>



            {/* ICONS */}
            <Box display={"flex"}>


                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                </IconButton>

                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>

                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>

                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>

            </Box>


        </Box>


    )

}

export default Topbar;
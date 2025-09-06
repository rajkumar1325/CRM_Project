import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

// header takes 2 parameters
const Header = ({ title, subTitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box mb={'10px'}>

        <Typography variant="h2"
            color={colors.gray[100]}
            fontWeight="bold"
            sx={{ mb: "%px" }} >
            {title}
        </Typography>

        <Typography variant="h5" color={colors.greenAccent[100]}>{subTitle}</Typography>
    </Box>
}

export default Header;

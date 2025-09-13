import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

// header takes 2 parameters
const Header = ({ title, subTitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box mb={2}>

        <Typography variant="h2"
                color={theme.palette.mode === 'dark' ? colors.gray[100] : colors.gray[800]}
            fontWeight="bold"
            sx={{ mb: "5px" }} >
            {title}
        </Typography>

        <Typography variant="h5" color= "text.secondary">{subTitle}</Typography>
    </Box>
}

export default Header;

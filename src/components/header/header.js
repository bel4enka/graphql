import {AppBar, Toolbar, Typography} from "@mui/material";
import { Link } from "react-router-dom";

export const Header= () => {
    return(
        <AppBar position="relative">
            <Toolbar>
                <Link to={'/'}> <Typography variant="h2" color="inherit" noWrap>
                     Новости
                </Typography></Link>
            </Toolbar>
        </AppBar>
    )
}
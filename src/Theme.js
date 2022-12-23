import { createTheme } from "@mui/material";
import "@fontsource/roboto/400.css";


export const mytheme = createTheme({
    palette:{
        primary:{
            main:'#1D94CE'
        },
        secondary:{
            main:'#D3DADD',
            contrastText: "#728691"
        },
        info:{
            main:'#728691'
        }
    }
})
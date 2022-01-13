import React, { useState, useEffect } from 'react'
import { Button, makeStyles, AppBar, Toolbar, Box } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { getCurrentUser } from '../services/AuthService';
import { blue } from '@material-ui/core/colors';
import { ListItemText, ListItemAvatar, ListItem, Avatar } from '@material-ui/core'

const theme = createTheme({
    palette: {
        primary: {
            main: '#e3b04b'
        },
        secondary: {
            main: '#5c1e17'
        }
    },
});

const useStyle = makeStyles({
    header: {
        background: '#e3b04b'
    },
    tabs: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 20
    },
    tabs2: {
        color: '#000000',
        marginRight: 17,
        textDecoration: 'none',
        fontSize: 17
    },
    tab_end: {
        color: '#5c1e17',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 18,
        alignItems: 'end'
        

    },
    buttonEdit: {
        '& > *': {
            color: '#FFFFFF'
        }
    }
})

const initialValue = {
    email: ""
}

function Preview() {

    const login = () => {
        localStorage.clear();
        window.location = "/login";
    }
    const [user, setUser] = useState(initialValue);
    const classes = useStyle();

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClose = () =>{
        setAnchorEl(null)
    }
    const openMenu = (event) =>{
        setAnchorEl(event.currentTarget)
    }
    const open = Boolean(anchorEl);

    return (
            <Box sx={{ display: 'flex', p: 1 }}>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                <a 
                >BIENVENIDOS LAMBDA-VENTAS
                </a>
                                    
                </Box>
                        
                   
               
                    <ThemeProvider theme={theme} >
                            <NavLink className={classes.tab_end}  to="/registrarse" >
                                REGISTRARSE
                            </NavLink>
                            <NavLink className={classes.tab_end}  to="/login" >
                                INICIAR SESIÓN
                            </NavLink>      
                    </ThemeProvider>

                   


                </Toolbar>
            </AppBar>
            </Box>

    )
}
export default Preview

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
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 20,
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

export function NavBar() {

    const logout = () => {
        localStorage.clear();
        window.location = "/";
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
                <Button
                    //variant = "contained"
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={openMenu}
                    
                >MENU
                </Button>
                
                <Menu
                    id="lame-menu"
                    anchorEl = {anchorEl}
                    keepMounted
                     
                    open = {Boolean(anchorEl)}
                    onClose = {handleClose}
                    >

                <MenuItem onClick={handleClose} className={classes.header}> <NavLink className={classes.tabs2} to="/home">Inicio</NavLink></MenuItem>   
                <MenuItem onClick={handleClose} className={classes.header}> <NavLink className={classes.tabs2} to="/getProducts">Listar Producto</NavLink></MenuItem> 
                <MenuItem onClick={handleClose} className={classes.header}> <NavLink className={classes.tabs2} to="/addProduct">Crear Producto</NavLink></MenuItem> 
                <MenuItem onClick={handleClose} className={classes.header}> <NavLink className={classes.tabs2} to="/getSales">Listar Ventas</NavLink></MenuItem> 
                <MenuItem onClick={handleClose} className={classes.header}> <NavLink className={classes.tabs2} to="/addSale">Crear Venta</NavLink></MenuItem> 
                <MenuItem onClick={handleClose} className={classes.header}> <NavLink className={classes.tabs2} to="/getUsers">Listar Usuarios</NavLink></MenuItem>
                </Menu>        
                </Box>
                        
                   
               
                    <ThemeProvider theme={theme} >
                    {user && (
                        <>
                            <Button className={classes.tab_end} >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                            👤
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.email} />
                                </ListItem>
                            </Button>
                            <Button color="secondary" variant="contained" onClick={() => logout()} >
                                Logout
                            </Button>
                        </>
                    )}
                        
                    </ThemeProvider>

                   


                </Toolbar>
            </AppBar>
            </Box>

    )
}

import React, { useState } from 'react'
import { makeStyles, Button, Typography, FormLabel, RadioGroup, Radio, FormControlLabel  } from '@material-ui/core';
import { createUser } from '../services/UsersService';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FormGroup, FormControl, InputLabel, Input, } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';




const initialValue = {
    fullName: '',
    email: '', 
    password: '',
    rol:true
}


const useStyles = makeStyles({
    container: {
    width: '50%',
    margin: '-2% 0 0 25%',
    '& > *': {
        marginTop: 20
    }
},
buttonEdit: {
    '& > *': {
        color: '#FFFFFF'
    }
}
});

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



export function Signup() {
    const [user, setNewUser] = useState(initialValue);
    const { fullName, email, password, rol } = user;

    const classes = useStyles();
    let history = useHistory();

    const onValueChange = (e) => {
        setNewUser({ ...user, [e.target.name]: e.target.value });
    }

    
    const onStateChange = (state) => {
        setNewUser({ ...user, "rol": state });
    }   


    const registerUser = async () => {
        await createUser(user);
        history.push('/login');
        //history.push('/getUsers');
    }

        
    const Cancel = () => {
        history.push('/');
    }


    return (
        <FormGroup className={classes.container} >
            <Typography variant="h4">Registrarse</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Nombre Completo</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="fullName" value={fullName} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="email" value={email} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="password" value={password} id="my-input" type="password"  />
            </FormControl>
            
            <FormControl component="fieldset">
                <FormLabel component="legend">Rol</FormLabel>
                <RadioGroup
                    name='rol'
                    onChange={(e) => onStateChange(e.target.value === "Vendedor")}
                    aria-label="rol"
                    defaultValue="Vendedor"
                    value={rol ? "Vendedor" : "Administrador"}>
                    <FormControlLabel value="Vendedor" control={<Radio />} label="Vendedor" />
                    <FormControlLabel value="Administrador" control={<Radio />} label="Administrador" />
                </RadioGroup>
            </FormControl>

            
            <ThemeProvider theme={theme}>
            <FormControl>
                <Button variant="contained" onClick={(e) => registerUser()} color="primary" className={classes.buttonEdit}>Registrarse</Button>
            </FormControl>
            <FormControl>
            <Button variant="contained" onClick={() => Cancel()} color="secondary" className={classes.buttonEdit}>Cancelar</Button>
            </FormControl>
            <Button  onClick color="secondary" style={{ textTransform: "none" }} > <NavLink to ="login"> ¿Ya tienes cuenta? Inicia Sesion </NavLink>
                
                </Button> 

            </ThemeProvider>
            </FormGroup>
                  
    )
}

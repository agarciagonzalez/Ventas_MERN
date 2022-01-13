import React, { useState } from 'react'
import { Paper, Grid, TextField, makeStyles, Button, Typography } from '@material-ui/core';
import { loginAuth } from '../services/AuthService';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles({
    container: {
        width: '300px',
        padding: '4%',
        margin: '50px auto 0 auto',
    }
})

const initialValue = {
    email: '',
    password: ''
}


export function Login() {

   /*  const dispatch = useDispatch(); */
    const [credentials, setCredentials] = useState(initialValue)

    const {email, password} = credentials

    const classes = useStyles();

    const onValueChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const startLogin = async () => {
        let response = await loginAuth(credentials);
        if(response.status === 200){
            let token = response.data.token;
            localStorage.setItem('token',token);
            window.location = "/";
        }
    }

    const googleSuccess = async (res) => {
        console.log(res);
       /*  const result = res?.profileObj;
        const token = res?.tokenId;
     */
       /*  try {
          dispatch({ type: 'AUTH', data: { result, token } });
    
          history.push('/');
        } catch (error) {
          console.log(error);
        } */
      };

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    return (
        <Paper className={classes.container} >
        <Typography variant="h4"> Inicia sesión  </Typography>
        <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
                <TextField value={email} name="email" onChange={(e) => onValueChange(e)} label="Email" type="email" fullWidth autoFocus required />
            </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
                <TextField  value={password} name="password" onChange={(e) => onValueChange(e)} label="Password" type="password" fullWidth required />
            </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
        
            <Button variant="contained" onClick={() => startLogin()} color="primary" style={{ textTransform: "none" }}>  Inicia sesión </Button>
            
        </Grid>
        
        <Grid container justify="center" style={{ marginTop: '10px' }}>
            
            <Button  onClick color="secondary" style={{ textTransform: "none" }} > <NavLink to ="registrarse"> ¿No tienes cuenta? Registrate</NavLink>
                
                 </Button> 
        </Grid>
    </Paper>
    )
}
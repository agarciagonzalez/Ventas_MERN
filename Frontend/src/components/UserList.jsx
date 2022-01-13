import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { getUsers} from '../services/UsersService';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';


import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#5c1e17',
            color: '#ffffff'
        }
    },
    
    buscar: {
        '& > *': {
            position: 'absolute',
            width: '1200px',
            height: '40px',
            padding: '0 1px',
            color: '#000000',
            outline: 'none',
            border: '1px solid #000000',
            top: '5px',
            right: '-640px',

        }
    },
    btn: {
        '& > *': {
             
            justifyContent: 'center',
            alignItems: 'center',
            width: '390px',
            height: '50px',
            lineHeight: '40',
            textAlign: 'center',
            color: 'black',
            fontSize: '20px',
            cursor: 'pointer'

        }
    },
   
    row: {
        '& > *': {
            fontSize: 18
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




export function UserList() {
    const classes = useStyles();

    const [user, setUser] = useState([])
    const [users, setUsers] = useState([])
    const[tablaUsuarios, setTablaUsusarios] = useState([])
    const [busqueda, setBusqueda]= useState("")
 
    useEffect(() => {
        getAllUsers();
        setUser(getCurrentUser());
    }, [])

    const getAllUsers = async () => {
        let response = await getUsers();
        console.log(response);
        setUsers(response.data.data);
        setTablaUsusarios(response.data.data);
    }

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    
        const filtrar=(terminoBusqueda)=>{
            // eslint-disable-next-line array-callback-return
            var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
              if(elemento.fullName.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
              || elemento.email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
              ){
                return elemento;
              }
            });
            setUsers(resultadosBusqueda);
          }



    return (
        
        
        <div >
            
        <div className={classes.btn}>
            <SearchIcon  />
            <InputBase className={classes.buscar} 
            placeholder="Buscar Nombre o Email"
            value={busqueda}
            onChange={handleChange}
            />
        </div>  
       
         

        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell align="center">Nombre Completo</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Rol</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    users.map(user => (
                        <TableRow className={classes.row} key={user._id}>
                            <TableCell align="center">{user.fullName}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.estado ? "Activo" : "Inactivo"}</TableCell>
                            <TableCell align="center">{user.rol ? "Vendedor" : "Administrador"}</TableCell>
                            <TableCell>
                                <ThemeProvider theme={theme}>
                                    <Button variant="contained" component={Link} to={`/editUser/${user._id}`} color="primary" className={classes.buttonEdit}>Editar</Button>
                                </ThemeProvider>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </div>
    )
}

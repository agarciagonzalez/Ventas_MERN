import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { getProducts} from '../services/ProductService';
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

export function ProductList() {
    const classes = useStyles();

    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])
    const[tablaProductos, setTablaProductos] = useState([])
    const [busqueda, setBusqueda]= useState("")

    useEffect(() => {
        getAllProducts();
        setUser(getCurrentUser());
    }, [])

    const getAllProducts = async () => {
        let response = await getProducts();
        console.log(response);
        setProducts(response.data.data);
        setTablaProductos(response.data.data);
    }

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }


    const filtrar=(terminoBusqueda)=>{
        // eslint-disable-next-line array-callback-return
        var resultadosBusqueda=tablaProductos.filter((elemento)=>{
          if(elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.valor.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        });
        setProducts(resultadosBusqueda);
      }

    return (

        <div >
            
        <div className={classes.btn}>
            <SearchIcon  />
            <InputBase className={classes.buscar} 
            placeholder="Buscar Nombre Cliente o Valor"
            value={busqueda}
            onChange={handleChange}
            />
        </div>

        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    {/* <TableCell align="center">Id</TableCell> */}
                    <TableCell align="center">Descripción</TableCell>
                    <TableCell align="center">Valor</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    products.map(product => (
                        <TableRow className={classes.row} key={product._id}>
                            {/* <TableCell align="center">{product._id}</TableCell> */}
                            <TableCell align="center">{product.descripcion}</TableCell>
                            <TableCell align="center">{product.valor}</TableCell>
                            <TableCell align="center">{product.estado ? "Disponible" : "Agotado"}</TableCell>
                            <TableCell>
                            {user && (
                                <ThemeProvider theme={theme}>
                                    <Button variant="contained" component={Link} to={`/editProduct/${product._id}`} color="primary" className={classes.buttonEdit}>Editar</Button>
                                </ThemeProvider>
                             )}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </div>
    )
}

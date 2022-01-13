import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { getSales,deleteSale} from '../services/SaleService';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    table: {
        width: '100%',
        margin: '20px 0 0 0px'
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
            fontSize: 18,
            textAlign: "center"
        }
    },    
    button: {
        marginInline: '5px'
    },
    button_add: {
        textAlign: "right"
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

export function SaleList() {
    const classes = useStyles();

    const [user, setUser] = useState([]);
    const [sales, setSales] = useState([]);
    const[tablaVentas, setTablaVentas] = useState([])
    const [busqueda, setBusqueda]= useState("")


    useEffect(() => {
        loadSalesData();
        setUser(getCurrentUser());
    }, [])

    const loadSalesData = async () =>{
        let response = await getSales();
        setSales(response.data.data);
        setTablaVentas(response.data.data);
    }

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }


    const filtrar=(terminoBusqueda)=>{
        // eslint-disable-next-line array-callback-return
        var resultadosBusqueda=tablaVentas.filter((elemento)=>{
          if(elemento.nombreCliente.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.valor.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        });
        setSales(resultadosBusqueda);
      }

    const deleteSaleData = async (id) =>{
        let callbackUser = window.confirm('Esta seguro de eliminar la venta');
        if (callbackUser) {
            await deleteSale(id);
            loadSalesData();
        }
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
                    <TableCell align="center">Nombre Cliente</TableCell>
                    <TableCell align="center">Valor</TableCell>
                    <TableCell align="center">Id Vendedor</TableCell>
                    <TableCell align="center">Fecha</TableCell>
                    <TableCell></TableCell>
                    {/* {user && (
                            <TableCell className={classes.button_add}>
                                <Button variant="contained" color="primary" component={Link} to="ventas/agregar" >Agregar</Button>
                            </TableCell>
                        )} */}
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    sales.map(sale => (
                        <TableRow className={classes.row} key={sale._id}>
                            <TableCell align="center">{sale.nombreCliente}</TableCell>
                            <TableCell align="center">{sale.valor}</TableCell>
                            <TableCell align="center">{sale.idVendedor}</TableCell>
                            <TableCell align="center">{sale.fecha.slice(0, 10)}</TableCell>
                            {user
                                    &&

                                    (<TableCell>
                                        <Button className={classes.button} variant="contained" component={Link} to={`sales/detalle/${sale._id}`} color="primary">Detalle</Button>
                                        <Button className={classes.button} variant="contained" component={Link} to={`editSale/${sale._id}`} color="info">Editar</Button>
                                        <Button className={classes.button} variant="contained" color="secondary" onClick={() => deleteSaleData(sale._id)} >Eliminar</Button>
                                    </TableCell>)
                                }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </div>
    )
}

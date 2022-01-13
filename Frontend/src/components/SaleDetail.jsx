import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { getSale, deleteSale } from '../services/SaleService';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';

const initialValue = {
    "productos": [],
    "fecha": "",
    "_id": "",
    "valor": 0,
    "nombreCliente": "",
    "idCliente": "",
    "idVendedor": ""
}

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '1% auto 0 auto'
    },
    thead: {
        textAlign: "center",
        '& > *': {
            fontSize: 20,
            background: '#5c1e17',
            textAlign: "center",
            color: '#FFFFFF'
        }
    },

    row: {
        '& > *': {
            fontSize: 18,
            textAlign: "center"
        }
    },
    button: {
        marginInline: '20px'
    },
    button_add: {
        textAlign: "right"
    }
})


export function SaleDetail() {
    const classes = useStyles();
    const [sale, setSale] = useState(initialValue);
    const [user, setUser] = useState([])
    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        loadSaleData(id);
        setUser(getCurrentUser());
    }, [])

    const loadSaleData = async (id) => {
        let response = await getSale(id);
        setSale(response.data.data);
    }

    const deleteSaleData = async (id) => {
        let callbackUser = window.confirm('Esta seguro de eliminar la venta');
        if (callbackUser) {
            await deleteSale(id);
            history.push('/ventas')
        }
    }
    const Cancel = () => {
        history.push('/getSales');
    }

    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Fecha: {sale.fecha.slice(0, 10)}</TableCell>
                        <TableCell>Valor: {sale.valor}</TableCell>
                        <TableCell>Id Cliente: {sale.idCliente}</TableCell>
                        <TableCell>Nombre Cliente: {sale.nombreCliente}</TableCell>
                        <TableCell>Id Vendedor: {sale.idVendedor}</TableCell>
                        {user && (
                            <TableCell className={classes.button_add}>
                                <Button variant="contained" onClick={() => Cancel()} color="primary">Cancelar</Button>
                                {/* <Button className={classes.button} variant="contained" component={Link} to={`editSale/${sale._id}`} color="primary">Editar</Button> */}
                                {/* <Button variant="contained" color="info" onClick={() => deleteSaleData(sale._id)} >Eliminar</Button> */}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
            </Table>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id</TableCell>
                        
                        <TableCell>Valor</TableCell>
                        <TableCell>Cantidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sale.productos.map(product => (
                            <TableRow className={classes.row} key={product._id}>
                                <TableCell>{product._id}</TableCell>
                                
                                <TableCell>{product.valor}</TableCell>
                                <TableCell>{product.cantidad}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
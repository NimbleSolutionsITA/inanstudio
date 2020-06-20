import React from "react";
import {useSelector} from "react-redux";
import {Divider, Grid, Typography} from "@material-ui/core";
import Container from "../../../components/Container";
import Item from "./Item";
import Button from "../../../components/Button";

const ShoppingBag = () => {
    const cart = useSelector(state => state.cart)
    const formatPrice = (price) =>  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price)
    return (
        <Container headerPadding>
            <Typography variant="h1" component="h1">SHOPPING BAG</Typography>
            <Divider />
            <br />
            {cart.length ?
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        {cart.map(i => <Item formatPrice={formatPrice} key={i.id} itemData={i} />)}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <Grid item xs={0} lg={4} />
                            <Grid item xs={12} lg={8}>
                                <Typography variant="h2">Summary</Typography>
                                <br />
                                {cart.map(i => <Typography key={i.id} style={{padding: '2px 0'}}>{i.name} - quantity: {i.qty}<span style={{float: 'right'}}>{formatPrice(i.price * i.qty)}</span></Typography>)}
                                <Divider style={{margin: '10px 0'}} light />
                                <Typography variant="h2">total<span style={{float: 'right'}}>{formatPrice(cart.map(i => i.qty * i.price).reduce((i, sum) =>  i + sum))}</span></Typography>
                                <br />
                                <Button variant="contained" color="secondary" to="/checkout" fullWidth>Checkout</Button>
                                <br />
                                <br />
                                <Button inactive disableGutters disablePadding to="/returns">Shipping and returns</Button><br />
                                <Button inactive disableGutters disablePadding to="/customer-service">need help?</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> :
                <Typography variant="h1" component="h1" color="secondary">THE BAG IS EMPTY</Typography>
            }
        </Container>
    )
}

export default ShoppingBag
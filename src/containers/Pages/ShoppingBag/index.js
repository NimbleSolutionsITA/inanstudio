import React from "react";
import {useSelector} from "react-redux";
import {Divider, Typography} from "@material-ui/core";
import Container from "../../../components/Container";
import CartItem from "../../../components/CartItem";
import Button from "../../../components/Button";
import SplitLayout from "../../../components/SplitLayout";
import {formatPrice} from "../../../helpers";

const ShoppingBag = () => {
    const cart = useSelector(state => state.cart)
    return (
        <Container headerPadding>
            <Typography variant="h1" component="h1">SHOPPING BAG</Typography>
            <Divider />
            <br />
            {cart.length ?
                <SplitLayout
                    left={cart.map(i => <CartItem isBag key={i.id} itemData={i} />)}
                    right={
                        <React.Fragment>
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
                        </React.Fragment>
                    }
                /> :
                <Typography variant="h1" component="h1" color="secondary">THE BAG IS EMPTY</Typography>
            }
        </Container>
    )
}

export default ShoppingBag
import React from "react";
import {Typography, Divider, Grid} from "@material-ui/core";
import CartItems from "./CartItems";
import Button from "../../../components/Button";
import {formatPrice} from "../../../helpers";

const PaymentSuccess = ({order, cart}) => {
    return (
        <React.Fragment>
            <Typography variant="h1">
                THANK YOU.<br />
                YOUR ORDER {order.id}<br />
                IS CONFIRMED.
            </Typography>
            <Divider />
            <Typography variant="h2">Order details:</Typography>
            <br />
            <Typography>
                <b>TO:</b><br />
                {order.shipping.first_name} {order.shipping.last_name}
            </Typography>
            <br />
            <Typography>
                <b>ADDRESS:</b><br />
                {order.shipping.address_1}
            </Typography>
            <br />
            <Typography>
                <b>DATE:</b><br />
                {order.date_created}
            </Typography>
            <br />
            <Divider light />
            <div style={{display: 'flex'}}>
                <Typography style={{margin: '4px 0'}}>SHIPPING</Typography>
                <div style={{flexGrow: 1}} />
                <Typography style={{margin: '4px 0'}}>{formatPrice(order.shipping_total)}</Typography>
            </div>
            <Divider />
            <div style={{display: 'flex'}}>
                <div style={{flexGrow: 1}} />
                <Typography variant="h2">TOTAL: {formatPrice(order.total)}</Typography>
            </div>
            <Divider />
            <Grid container>
                <Grid item xs={6} sm={3} style={{marginTop: '20px'}}>
                    <CartItems cart={cart} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Button fullWidth variant="contained" to="/" color="secondary" style={{marginTop: '10px'}}>Back to homepage</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PaymentSuccess
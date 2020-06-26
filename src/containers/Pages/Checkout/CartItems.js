import React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import {formatPrice} from "../../../helpers";

const CartItems = ({cart}) => {
    return (
        <React.Fragment>
            {cart.map((cartItem, i) =>
                <div key={cartItem.id}>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <img width="100%" src={cartItem.image} alt={cartItem.name} />
                        </Grid>
                        <Grid item xs={7} style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography><b>
                                {cartItem.name}<br/>
                                {formatPrice(cartItem.price)}
                            </b></Typography>
                            <br />
                            <Typography>
                                {cartItem.leather && `leather type: ${cartItem.leather}`}
                                {cartItem.leather && <br />}
                                {cartItem.size && `size: ${cartItem.size}`}
                                {cartItem.size && <br />}
                                {cartItem.color && `color: ${cartItem.color}`}
                                {cartItem.color && <br />}
                                {`quantity: ${cartItem.qty}`}
                            </Typography>
                            <div style={{minHeight: '10px', flexGrow: 1}} />
                            <Typography style={{padding: '10px 0'}}>{`subtotal: ${formatPrice(cartItem.price * cartItem.qty)}`}</Typography>
                        </Grid>
                    </Grid>
                    {cart.length !== i+1 && <Divider style={{margin: '5px 0 15px'}}/>}
                </div>
            )}
        </React.Fragment>
    )
}

export default CartItems
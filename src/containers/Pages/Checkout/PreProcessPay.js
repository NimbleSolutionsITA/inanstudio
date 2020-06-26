import React, {useState} from 'react'
import {Typography, Divider, TextField, FormControl, CircularProgress} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateOrder} from "../../../providers/WoocommerceDataProvider/actions";
import {formatPrice} from "../../../helpers";
import Button from "../../../components/Button";
import CartItems from "./CartItems";

const PreProcessPay = ({setIsCheckoutReady}) => {
    const [coupon, setCoupon] = useState(null)
    const order = useSelector(state => state.woocommerce.currentOrder)
    const cart = useSelector(state => state.cart)
    const error = useSelector(state => state.woocommerce.error)
    const loading = useSelector(state => state.woocommerce.creatingOrder)
    const dispatch = useDispatch()

    const subtotal = formatPrice(cart.map(i => i.qty * i.price).reduce((i, sum) =>  i + sum))

    const handleChangeCoupon = (event) => {
        setCoupon(event.target.value)
    }

    const handleCheckout = () => {
        setIsCheckoutReady(true)
    }

    const handleApplyCoupon = () => {
        dispatch(updateOrder(order.id, {coupon_lines: [{code: coupon}]}))
    }

    return (
        <React.Fragment>
            <Typography variant="h2">Products</Typography>
            <br />
            <CartItems cart={cart} />
            <br />
            <Typography variant="h2">Summary</Typography>
            <FormControl fullWidth>
                <TextField
                    disabled={!order && !coupon}
                    placeholder="ENTER YOUR CODE"
                    required
                    autoComplete="off"
                    error={order && coupon && !!error}
                    label="PROMOTIONAL CODE"
                    helperText={order && coupon && error}
                    fullWidth
                    type="text"
                    value={coupon}
                    onChange={handleChangeCoupon}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            <div style={{width: '100%', height: '50px'}}>
                <Button
                    style={{float: 'right', margin: '10px 0', minWidth: '100px'}}
                    variant="outlined"
                    color="secondary"
                    disabled={!order}
                    onClick={handleApplyCoupon}
                >
                    {order && coupon && loading ? <CircularProgress color="secondary" size={15} /> : 'apply code'}
                </Button>
            </div>
            <div style={{width: '100%'}}>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>SUBTOTAL</div>
                    <div>{subtotal}</div>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>SHIPPING</div>
                    <div>{formatPrice(order ? order.shipping_total : 0)}</div>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>TAX</div>
                    <div>{formatPrice(order ? order.total_tax : 0)}</div>
                </div>
                <Divider style={{marginTop: '10px', marginBottom: '5px'}} />
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}><Typography variant="h2">TOTAL</Typography></div>
                    <div><Typography variant="h2">{formatPrice(order ? order.total : cart.map(i => i.qty * i.price).reduce((i, sum) =>  i + sum))}</Typography></div>
                </div>
            </div>
            <div style={{margin: '20px 0'}}>
                <Button disabled={!order} fullWidth variant="contained" onClick={handleCheckout} color="secondary" style={{marginTop: '10px'}}>Checkout</Button>
            </div>
            <Button disabled={!order} inactive disableGutters disablePadding to="/returns">Shipping and returns</Button><br />
            <Button disabled={!order} inactive disableGutters disablePadding to="/customer-service">need help?</Button>
        </React.Fragment>
    )
}

export default PreProcessPay
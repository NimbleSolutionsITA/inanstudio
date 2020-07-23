import React, {useState} from 'react'
import {
    Typography,
    Divider,
    TextField,
    FormControl,
    CircularProgress,
    FormGroup,
    FormControlLabel
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateOrder} from "../../../providers/WoocommerceDataProvider/actions";
import {formatPrice} from "../../../helpers";
import Button from "../../../components/Button";
import CartItems from "./CartItems";
import Checkbox from "../../../components/Checkbox";

const PreProcessPay = ({setIsCheckoutReady}) => {
    const [coupon, setCoupon] = useState('')
    const [isGift, setIsGift] = useState(false)
    const order = useSelector(state => state.woocommerce.currentOrder)
    const cart = useSelector(state => state.cart)
    const error = useSelector(state => state.woocommerce.error)
    const loading = useSelector(state => state.woocommerce.creatingOrder)
    const dispatch = useDispatch()

    const giftBoxCost = useSelector(state => state.woocommerce['shipping-GIFT']).settings.cost.value
    const shippingCost = order?.shipping_total
    const totalShipping = isGift ? parseInt(shippingCost) + parseInt(giftBoxCost) : shippingCost
    const total = isGift ? parseInt(order?.total) + parseInt(giftBoxCost) : order?.total
    const subtotal = formatPrice(cart.map(i => i.qty * i.price).reduce((i, sum) =>  i + sum))

    console.log(order?.discount_total)

    const handleChangeCoupon = (event) => {
        setCoupon(event.target.value)
    }

    const handleCheckout = () => {
        if(isGift) {
            dispatch(updateOrder(order.id, {
                shipping_lines: [{method_id: "flat_rate", method_title: "Gift Box", total: giftBoxCost}]
            }))
        }
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
                    disabled={!order?.id && !coupon}
                    placeholder="ENTER YOUR CODE"
                    required
                    autoComplete="off"
                    error={!!order && !!coupon && !!error}
                    label="PROMOTIONAL CODE"
                    helperText={order && coupon && error}
                    fullWidth
                    type="text"
                    value={coupon}
                    onChange={handleChangeCoupon}
                    InputLabelProps={{
                        disableAnimation: true,
                        focused: false,
                        shrink: true,
                    }}
                />
            </FormControl>
            <div style={{width: '100%', height: '50px'}}>
                <Button
                    style={{float: 'right', margin: '10px 0', minWidth: '100px'}}
                    variant="outlined"
                    color="secondary"
                    disabled={!order?.id && !coupon}
                    onClick={handleApplyCoupon}
                >
                    {order && coupon && loading ? <CircularProgress color="secondary" size={15} /> : 'apply code'}
                </Button>
            </div>
            {/*<FormControl component="fieldset" style={{width: '100%', padding: ''}}>
                <FormGroup aria-label="position" style={{marginTop: '-20px', marginBottom: '20px'}}>
                    <FormControlLabel
                        style={{marginRight: 0}}
                        value="Gift Box"
                        control={
                            <Checkbox
                                disabled={!order?.id}
                                fill
                                checked={isGift}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={() => setIsGift(!isGift)}
                            />}
                        label="Gift Box"
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>*/}
            <div style={{width: '100%'}}>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>SUBTOTAL</div>
                    <div>{subtotal}</div>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>SHIPPING</div>
                    <div>{formatPrice(order?.id ? totalShipping : 0)}</div>
                </div>
                {order?.total_tax > 0 && (
                    <div style={{display: 'flex'}}>
                        <div style={{flexGrow: 1}}>TAX</div>
                        <div>{formatPrice(order?.id ? order.total_tax : 0)}</div>
                    </div>
                )}
                {order && order.discount_total !== '0.00' && (
                    <div style={{display: 'flex'}}>
                        <div style={{flexGrow: 1}}>DISCOUNT</div>
                        <div>- {formatPrice(order?.discount_total)}</div>
                    </div>
                )}
                <Divider style={{marginTop: '10px', marginBottom: '5px'}} />
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}><Typography variant="h2">TOTAL</Typography></div>
                    <div><Typography variant="h2">{formatPrice(order?.id ? total : cart.map(i => i.qty * i.price).reduce((i, sum) =>  i + sum))}</Typography></div>
                </div>
            </div>
            <div style={{margin: '20px 0'}}>
                <Button disabled={!order?.id} fullWidth variant="contained" onClick={handleCheckout} color="secondary" style={{marginTop: '10px'}}>Checkout</Button>
            </div>
            <Button disabled={!order?.id} inactive disableGutters disablePadding to="/returns">Shipping and returns</Button><br />
            <Button disabled={!order?.id} inactive disableGutters disablePadding to="/customer-service">need help?</Button>
        </React.Fragment>
    )
}

export default PreProcessPay
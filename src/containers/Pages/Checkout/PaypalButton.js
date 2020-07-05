import React, { useRef, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {destroyCart} from "../ShoppingBag/actions";
import {updateOrder} from "../../../providers/WoocommerceDataProvider/actions";
import {Typography} from "@material-ui/core";

const PaypalButton = ({setPaypalError, setPaypalSuccess}) => {
    const order = useSelector(state => state.woocommerce.currentOrder)
    const dispatch = useDispatch()

    const paypalRef = useRef();

    useEffect(() => {
        if (order) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: order.total,
                            },
                        }],
                    });
                },
                onApprove: () => {
                    setPaypalSuccess(order);
                    dispatch(updateOrder(order.id, {set_paid: true}))
                    dispatch(destroyCart())
                },
                onError: err => {
                    setPaypalError(err);
                    console.error(err);
                },
            }).render(paypalRef.current);
        }
    }, [dispatch, order, setPaypalError, setPaypalSuccess]);

    return (
        <React.Fragment>
            <Typography variant="h2">Select your payment method</Typography>
            <br />
            <div ref={paypalRef} />
        </React.Fragment>
    )
}

export default PaypalButton
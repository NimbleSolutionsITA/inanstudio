import React, { useRef, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {destroyCart} from "../ShoppingBag/actions";
import {updateOrder} from "../../../providers/WoocommerceDataProvider/actions";
import scriptLoader from "react-async-script-loader";
import {Typography} from "@material-ui/core";
import {PAYPAL_SANDBOX, PAYPAL_PRODUCTION} from "../../../constants";

const CLIENT = {
    sandbox:
        PAYPAL_SANDBOX,
    production:
        PAYPAL_PRODUCTION,
};

console.log(CLIENT)

const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

const PaypalButton = ({setPaypalError, setPaypalSuccess, isScriptLoaded, isScriptLoadSucceed}) => {
    const order = useSelector(state => state.woocommerce.currentOrder)
    const dispatch = useDispatch()

    const paypalRef = useRef();

    useEffect(() => {
        if (order && isScriptLoaded && isScriptLoadSucceed) {
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
                onApprove: (data, actions) => {
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then(() => {
                        setPaypalSuccess(order);
                        dispatch(updateOrder(order.id, {set_paid: true}))
                        dispatch(destroyCart())
                    });
                },
                onError: err => {
                    setPaypalError(err);
                    console.error(err);
                },
            }).render(paypalRef.current);
        }
    }, [dispatch, isScriptLoadSucceed, isScriptLoaded, order, setPaypalError, setPaypalSuccess]);

    return (
        <React.Fragment>
            <Typography variant="h2">Select your payment method</Typography>
            <br />
            <div ref={paypalRef} />
        </React.Fragment>
    )
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=EUR`)(PaypalButton);
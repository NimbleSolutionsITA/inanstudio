import React, {useEffect, useState} from "react";
import history from "../../../history";
import NavigationPrompt from "react-router-navigation-prompt"
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder} from "../../../providers/WoocommerceDataProvider/actions";
import {Grid, Typography, Divider} from "@material-ui/core";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import LoginForm from "../../../components/Login";
import PreProcess from "./PreProcess";
import PaymentError from "./PaymentError";
import PaymentSuccess from "./PaymentSuccess";
import Dialog from "../../../components/Dialog";

const Checkout = () => {
    const [isGuest, setIsGuest] = useState(false)
    const [paypalSuccess, setPaypalSuccess] = useState(null);
    const [paypalError, setPaypalError] = useState(false);
    const cart = useSelector(state => state.cart)
    const authenticated = useSelector(state => state.user.authenticated)
    const currentOrder = useSelector(state => state.woocommerce.currentOrder)

    const dispatch = useDispatch()
    const onPageLeave = (callback) => {
        dispatch(deleteOrder((currentOrder.id)))
        callback()
    }

    useEffect(() => {
        if (!cart.length && !paypalSuccess) history.goBack()
    })

    console.log({isGuest, paypalSuccess, paypalError, currentOrder, status: currentOrder && currentOrder.status === 'pending'})

    return (
        <Container headerPadding>
            <NavigationPrompt
                when={(crntLocation, nextLocation) =>
                    (!nextLocation || !nextLocation.pathname.startsWith(crntLocation.pathname)) &&
                    currentOrder &&
                    currentOrder.status === 'pending'}
                beforeConfirm={(callback) => onPageLeave(callback)}
            >
                {({ onConfirm, onCancel }) => (
                    <Dialog
                        isActive={currentOrder && currentOrder.status === 'pending'}
                        onConfirm={onConfirm}
                        onCancel={onCancel}
                        message="ARE YOU SURE YOU WANT TO DROP THIS ORDER?"
                    />
                )}
            </NavigationPrompt>
            <Typography variant="h1">Checkout</Typography>
            <Divider />
            <br />
            {!isGuest && !authenticated ?
                cart.length &&
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} style={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h2">CONTINUE AS GUEST</Typography>
                        <Divider />
                        <br />
                        <Typography>CONTINUE WITHOUT REGISTRATION.</Typography>
                        <div style={{flexGrow: 1}}/>
                        <br />
                        <Button fullWidth variant="contained" color="secondary" onClick={() => setIsGuest(true)}>continue as guest</Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h2">LOGIN</Typography>
                        <Divider />
                        <LoginForm />
                    </Grid>
                    <Grid item xs={12} md={4} style={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h2">REGISTER</Typography>
                        <Divider />
                        <br />
                        <Typography>REGISTER TO COMPLETE CHECKOUT MORE QUICKLY, REVIEW ORDER INFORMATION and much more.</Typography>
                        <div style={{flexGrow: 1, minHeight: '10px'}}/>
                        <Button fullWidth variant="contained" color="secondary" to="/account/register">register</Button>
                    </Grid>
                </Grid> :
                <React.Fragment>
                    {!paypalSuccess && !paypalError && <PreProcess isGuest={isGuest} setPaypalSuccess={setPaypalSuccess} setPaypalError={setPaypalError} />}
                    {paypalError && <PaymentError setPaypalError={setPaypalError} />}
                    {paypalSuccess && <PaymentSuccess cart={cart} order={paypalSuccess} />}
                </React.Fragment>
            }
        </Container>
    )
}

export default Checkout
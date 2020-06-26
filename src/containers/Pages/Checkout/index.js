import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Grid, Typography, Divider} from "@material-ui/core";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import LoginForm from "../../../components/Login";
import PreProcess from "./PreProcess";
import PaymentError from "./PaymentError";
import PaymentSuccess from "./PaymentSuccess";

const Checkout = () => {
    const [isGuest, setIsGuest] = useState(false)
    const [paypalSuccess, setPaypalSuccess] = useState(null);
    const [paypalError, setPaypalError] = useState(false);
    const cart = useSelector(state => state.cart)
    const authenticated = useSelector(state => state.user.authenticated)
    return (
        <Container headerPadding>
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
import React from "react";
import {Typography, Grid} from "@material-ui/core";
import Button from "../../../components/Button";

const PaymentError = ({setPaypalError}) => {
    const handleClick = () => setPaypalError(false)
    return (
        <div style={{marginTop: '30px'}}>
            <Typography variant="h2" style={{color: 'red', padding: 0}}>Something went wrong</Typography>
            <Typography variant="h2">try again to proceed with your order</Typography>
            <br />
            <Grid container>
                <Grid item xs={6}>
                    <Button fullWidth color="secondary" variant="contained" onClick={handleClick}>Proceed to payment</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default PaymentError
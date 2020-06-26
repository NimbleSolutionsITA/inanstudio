import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router"
import {Typography, Divider, Grid} from "@material-ui/core"
import Button from "../../../components/Button"
import LoginForm from "../../../components/Login";

const Login = ({authenticated}) => {
    return (
        <Grid style={{marginTop: '20px'}} container spacing={4}>
            {authenticated && <Redirect to="/" />}
            <Grid item xs={12} md={6}>
                <Typography variant="h1" component="h1">Log in</Typography>
                <Divider />
                <LoginForm />
            </Grid>
            <Grid item xs={12} md={6} style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h1" component="h1">Register</Typography>
                <Divider />
                <div style={{flexGrow: 1, paddingTop: '20px'}}>
                    <Typography variant="body1" component="p">REGISTER TO COMPLETE CHECKOUT MORE QUICKLY, REVIEW ORDER INFORMATION and much more.</Typography>
                </div>
                <Button to="/account/register" variant="contained" color="secondary" fullWidth>Register</Button>
            </Grid>
        </Grid>
    )
}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(Login)
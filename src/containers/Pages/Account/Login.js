import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router"
import {Typography, Divider, Grid, useTheme, useMediaQuery} from "@material-ui/core"
import Button from "../../../components/Button"
import LoginForm from "../../../components/Login";

const Login = ({authenticated}) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    return (
        <Grid style={{marginTop: isMobile ? 0 : '20px'}} container spacing={4}>
            {authenticated && <Redirect to="/" />}
            <Grid item xs={12} md={6}>
                <Typography variant="h1" component="h1">Log in</Typography>
                {!isMobile && <Divider />}
                <LoginForm />
            </Grid>
            <Grid item xs={12} md={6} style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h1" component="h1">Register</Typography>
                {!isMobile && <Divider />}
                <div style={{flexGrow: 1, paddingTop: isMobile ? 0 : '20px', paddingBottom: '10px'}}>
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
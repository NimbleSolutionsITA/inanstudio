import React from 'react'
import {Typography, Divider} from "@material-ui/core"
import Container from "../../../components/Container"
import {Route, Switch} from "react-router-dom"
import PrivateRoute from "../../../components/PrivateRoute"
import Login from "./Login"
import Register from "./Register"
import ResetPassword from "./ResetPassword"
import Profile from "./Profile"

const Account = () => {
    return (
        <Container headerPadding>
            <Typography variant="h1" component="h1">Account</Typography>
            <Divider />
            <Switch>
                <Route exact path="/account/login" component={Login} />
                <Route exact path="/account/register" component={Register} />
                <Route exact path="/account/reset-password" component={ResetPassword} />
                <PrivateRoute exact path="/account" component={Profile} />
            </Switch>
        </Container>
    )
}

export default Account
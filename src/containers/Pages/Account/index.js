import React from 'react'
import Container from "../../../components/Container"
import {Route, Switch} from "react-router-dom"
import PrivateRoute from "../../../components/PrivateRoute"
import Login from "./Login"
import Register from "./Register"
import ResetPassword from "./ResetPassword"
import Profile from "./Profile"

const Account = () => {
    return (
        <Container headerPadding >
            <Switch>
                <Route exact path="/account/login" component={Login} />
                <Route exact path="/account/register" component={Register} />
                <Route exact path="/account/reset-password" component={ResetPassword} />
                <PrivateRoute path="/account" component={Profile} />
            </Switch>
        </Container>
    )
}

export default Account
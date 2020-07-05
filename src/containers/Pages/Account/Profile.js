import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import PrivateRoute from "../../../components/PrivateRoute";
import {Switch, useLocation} from "react-router";
import { Grid, Divider, Typography } from "@material-ui/core"
import Button from "../../../components/Button"
import PersonalInfo from "./PersonalInfo";
import AddressBook from "./AddressBook";
import Orders from "./Orders";
import useWoocommerceData from "../../../providers/WoocommerceDataProvider"
import {logout} from "../../../providers/AuthProvider/actions"

const Profile = () => {
    const userId = useSelector(state => state.user.id)
    const userInfo = useWoocommerceData(`customers/${userId}`)
    const orders = useWoocommerceData('orders', {customer: userId, per_page: 100, status: ['processing', 'completed', 'refunded']})

    const { pathname } = useLocation()

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Grid container spacing={4} style={{paddingTop: '30px'}}>
            <Grid item xs={12} md={4}>
                <Button inactive={pathname !== '/account'} disableRipple lineThrough disableGutters disablePadding disableHover to="/account"><Typography variant="h3" component="h3">Personal info</Typography></Button>
                <Divider />
                <Button inactive={pathname !== '/account/address-book'} disableRipple lineThrough disableGutters disablePadding disableHover to="/account/address-book"><Typography variant="h3" component="h3">Address book</Typography></Button>
                <Divider />
                <Button inactive={pathname !== '/account/orders'} disableRipple lineThrough disableGutters disablePadding disableHover to="/account/orders"><Typography variant="h3" component="h3">Orders</Typography></Button>
                <Divider />
                <Button disableRipple lineThrough disableGutters disablePadding disableHover onClick={handleLogout}><Typography variant="h3" component="h3">Logout</Typography></Button>
                <Divider />
            </Grid>
            {userInfo && (
                <Grid item xs={12} md={8}>
                    <Switch>
                        <PrivateRoute exact path="/account" component={() => <PersonalInfo userId={userId} email={userInfo.email} firstName={userInfo.first_name} lastName={userInfo.last_name} />} />
                        <PrivateRoute exact path="/account/address-book" component={() => <AddressBook userId={userId} shippingWP={userInfo.shipping} billingWP={userInfo.billing} />} />
                        <PrivateRoute exact path="/account/orders" component={() => <Orders orders={orders} />} />
                    </Switch>
                </Grid>
            )}
        </Grid>
    )
}

export default Profile
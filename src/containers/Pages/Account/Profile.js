import React from 'react'
import {useSelector} from "react-redux"
import PrivateRoute from "../../../components/PrivateRoute";
import {Switch, useLocation} from "react-router";
import {Grid, Divider, useTheme, useMediaQuery} from "@material-ui/core"
import NavButton from "../../../components/NavButton"
import PersonalInfo from "./PersonalInfo";
import AddressBook from "./AddressBook";
import Orders from "./Orders";
import useWoocommerceData from "../../../providers/WoocommerceDataProvider"

const Profile = () => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const userId = useSelector(state => state.user.id)
    const userInfo = useWoocommerceData(`customers/${userId}`)
    const orders = useWoocommerceData('orders', {customer: userId, per_page: 100, status: ['processing', 'completed', 'refunded']})

    const { pathname } = useLocation()
    return (
        <Grid container spacing={4} style={{paddingTop: '30px'}}>
            <Grid item xs={12} md={4}>
                {isMobile && <Divider />}
                <NavButton inactive={pathname !== '/account'} path="/account" title="Personal info" />
                <NavButton inactive={pathname !== '/account/address-book'} path="/account/address-book" title="Address book" />
                <NavButton inactive={pathname !== '/account/orders'} path="/account/orders" title="Orders" />
            </Grid>
            {userInfo && (
                <Grid item xs={12} md={8}>
                    <Switch>
                        <PrivateRoute exact path="/account" component={() => <PersonalInfo isMobile={isMobile} userId={userId} email={userInfo.email} firstName={userInfo.first_name} lastName={userInfo.last_name} />} />
                        <PrivateRoute exact path="/account/address-book" component={() => <AddressBook isMobile={isMobile} userId={userId} shippingWP={userInfo.shipping} billingWP={userInfo.billing} />} />
                        <PrivateRoute exact path="/account/orders" component={() => <Orders orders={orders} isMobile={isMobile} />} />
                    </Switch>
                </Grid>
            )}
        </Grid>
    )
}

export default Profile
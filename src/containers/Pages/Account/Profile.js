import React, {useState} from 'react'
import {connect, useDispatch} from "react-redux"
import {logout} from "../../../providers/AuthProvider/actions"
import { Grid, Divider, Typography } from "@material-ui/core"
import Button from "../../../components/Button"
import PersonalInfo from "./PersonalInfo";
import AddressBook from "./AddressBook";
import useWoocommerceData from "../../../providers/WoocommerceDataProvider"

const Profile = ({userId, woocommerce}) => {
    useWoocommerceData(`customers/${userId}`)
    const userInfo = woocommerce[`customers-${userId}`]
    const [value, setValue] = useState(0)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const handleChange = (newValue) => {
        setValue(newValue)
    }
    return (
        <Grid container spacing={4} style={{paddingTop: '30px'}}>
            <Grid item xs={12} md={4}>
                <Button inactive={value !== 0} disableGutters disablePadding disableHover onClick={() => handleChange(0)}><Typography variant="h3" component="h3">Personal info</Typography></Button>
                <Divider />
                <Button inactive={value !== 1} disableGutters disablePadding disableHover onClick={() => handleChange(1)}><Typography variant="h3" component="h3">Address book</Typography></Button>
                <Divider />
                <Button inactive={value !== 2} disableGutters disablePadding disableHover onClick={() => handleChange(2)}><Typography variant="h3" component="h3">Orders</Typography></Button>
                <Divider />
                <Button disableGutters disablePadding disableHover onClick={handleLogout}><Typography variant="h3" component="h3">Logout</Typography></Button>
                <Divider />
            </Grid>
            {userInfo && (
                <Grid item xs={12} md={8}>
                    {value === 0 && (
                        <PersonalInfo userId={userId} email={userInfo.email} firstName={userInfo.first_name} lastName={userInfo.last_name} />
                    )}
                    {value === 1 && (
                        <AddressBook userId={userId} shippingWP={userInfo.shipping} billingWP={userInfo.billing} />
                    )}
                    {value === 2 && (
                        <Typography variant="h1" component="h3">ORDERS</Typography>
                    )}
                </Grid>
            )}
        </Grid>
    )
}
const mapStateToProps = state => ({
    userId: state.user.id,
    woocommerce: state.woocommerce,
})

export default connect(mapStateToProps)(Profile)
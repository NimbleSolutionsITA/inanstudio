import React, {useState} from 'react'
import {updateCustomer as updateC, createOrder} from '../../../providers/WoocommerceDataProvider/actions'
import {connect} from "react-redux"
import {
    Typography,
    Divider,
    CircularProgress,
    Collapse, TextField, FormControl,
} from "@material-ui/core"
import Button from "../../../components/Button"
import AddressForm from "../Account/AddressForm"
import {regExpEmail} from "../../../helpers";

const PreProcessAddress = ({isGuest, address, setAddress, user, woocommerce, creatingUser, userCreated, updateCustomer, error, createOrder, cart}) => {
    const emptyAddress = {
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        city: '',
        postcode: '',
        country: '',
        state: '',
    }
    const userInfo = isGuest ? null : woocommerce[`customers-${user.id}`]
    const shippingWP = isGuest ? emptyAddress : userInfo.shipping
    const billingWP = isGuest ? emptyAddress : userInfo.billing
    const initialState = (address) => {
        return {
            firstName: address.first_name,
            lastName: address.last_name,
            company: address.company,
            address: address.address_1,
            city: address.city,
            postcode: address.postcode,
            country: address.country,
            state: address.state,
        }
    }
    const errorInitialState = {
        firstName: false,
        lastName: false,
        company: false,
        address: false,
        city: false,
        postcode: false,
        country: false,
        state: false,
    }

    const [shippingData, setShippingData] = useState(initialState(shippingWP))
    const [editShipping, setEditShipping] = useState(!shippingWP.address_1)
    const [editBilling, setEditBilling] = useState(!billingWP.address_1)
    const [billingData, setBillingData] = useState(initialState(billingWP))
    const [shippingError, setShippingError] = useState(errorInitialState)
    const [billingError, setBillingError] = useState(errorInitialState)

    const [guestEmail, setGuestEmail] = useState('')
    const [guestEmailError, setGuestEmailError] = useState(false)

    const [data, setData] = useState({
        isShipping: !!shippingWP.address_1,
        isBilling: !!billingWP.address_1,
        honeypot: false,
    })

    const cartItems = cart.map(i => {
        return {product_id: i.id, quantity: i.qty}
    })
    const getErrors = (address) => {
        return {
            firstName: !address.firstName && 'FIRST NAME IS REQUIRED',
            lastName: !address.lastName && 'LAST NAME IS REQUIRED',
            address: !address.address && 'ADDRESS IS REQUIRED',
            city: !address.city && 'CITY IS REQUIRED',
            postcode: !address.postcode && 'POST CODE IS REQUIRED',
            country: !address.country && 'COUNTRY IS REQUIRED',
        }
    }

    const checkAddress = (errors) => {
        return (Object.values(errors).every(i => !i))
    }

    const saveData = (address, guestEmail = null) => {
        return {
            first_name: address.firstName,
            last_name: address.lastName,
            company: address.company,
            address_1: address.address,
            city: address.city,
            postcode: address.postcode,
            country: address.country,
            state: address.state,
            email: guestEmail,
        }
    }

    function handleSaveShipping() {
        setShippingError(getErrors(shippingData))

        if (checkAddress(getErrors(shippingData))) {
            const shipping = saveData(shippingData)
            if(!isGuest) updateCustomer(user.id, {shipping});
            setEditShipping(!editShipping)
        }
    }

    function handleSaveBilling() {
        setBillingError(getErrors(billingData))

        if (checkAddress(getErrors(billingData)) ) {
            const billing = saveData(billingData)
            if(!isGuest) updateCustomer(user.id, {billing});
            setEditBilling(!editBilling)
        }
    }

    function handleChangeEmail(event) {
        setGuestEmail(event.target.value)
    }

    function handleProceed() {
        if (isGuest) {
            setGuestEmailError((!guestEmail.match(regExpEmail) || !guestEmail) && 'PLEASE ENTER A VALID EMAIL')
            if (!guestEmail.match(regExpEmail))
                return
            setAddress({shipping: saveData(shippingData), billing: saveData(billingData)})
            createOrder({shipping: saveData(shippingData), billing: saveData(billingData, guestEmail), line_items: cartItems})
            return
        }
        setAddress({shipping: saveData(shippingData), billing: billingData.address && saveData(billingData)})
        createOrder({shipping: saveData(shippingData), billing: billingData.address && saveData(billingData), line_items: cartItems, customer_id: user.id})
    }
    return (
        <form>
            <Typography variant="h1" component="h1">Address</Typography>
            <Divider />
            {!error && userCreated && <Typography variant="body1">ADDRESS BOOK SUCCESSFULLY UPDATED</Typography> }
            {userCreated && <Typography variant="body1" color="error">{error}</Typography> }
            <br />
            <Typography style={{float: 'right', margin: '10px 0'}} ><b>Shipping</b></Typography>
            <Typography style={{margin: '10px 0'}}><b>{shippingData.firstName ? `${shippingData.firstName} ${shippingData.lastName}${shippingData.company && `- ${shippingData.company}`}` : 'Name Surname'}</b></Typography>
            <Typography>{shippingData.address ? `${shippingData.address}, ${shippingData.city}, ${shippingData.postcode},${shippingData.state && `${shippingData.state}, `} ${shippingData.country}` : 'Address'}</Typography>
            {isGuest &&
                <React.Fragment>
                    <br />
                    <FormControl fullWidth>
                        <TextField
                            disabled={!!address.shipping}
                            placeholder="ENTER YOUR EMAIL"
                            required
                            autoComplete="email"
                            error={!!guestEmailError}
                            label="EMAIL"
                            helperText={guestEmailError}
                            fullWidth
                            type="email"
                            value={guestEmail}
                            onChange={handleChangeEmail}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </React.Fragment>
            }
            <div style={{paddingTop: '10px'}}>
                {editShipping ?
                    <Button disabled={!!address.shipping} disableGutters onClick={handleSaveShipping}><b>Save</b></Button> :
                    <Button disabled={!!address.shipping} disableGutters onClick={() => setEditShipping(!editShipping)}><b>Edit</b></Button>
                }
            </div>
            <Collapse in={editShipping && !address.shipping} style={{marginBottom: '20px'}}>
                <AddressForm data={shippingData} setData={setShippingData} dataError={shippingError} setDataError={setShippingError} />
            </Collapse>
            <Divider/>
            <Collapse in={data.isBilling}>
                <br />
                <Typography style={{float: 'right', margin: '10px 0'}} ><b>Billing</b></Typography>
                <Typography style={{margin: '10px 0'}}><b>{billingData.firstName && billingData.lastName ? `${billingData.firstName} ${billingData.lastName}${billingData.company && `- ${billingData.company}`}` : 'Name Surname'}</b></Typography>
                <Typography>{billingData.address ? `${billingData.address}, ${billingData.city}, ${billingData.postcode},${billingData.state && `${billingData.state}, `} ${billingData.country}` : 'Address'}</Typography>
                <div style={{paddingTop: '10px'}}>
                    {editBilling ?
                        <Button disabled={!!address.shipping} disableGutters onClick={handleSaveBilling}><b>Save</b></Button> :
                        <Button disabled={!!address.shipping} disableGutters onClick={() => setEditBilling(!editBilling)}><b>Edit</b></Button>
                    }
                </div>
                <Collapse in={editBilling && !address.shipping} style={{marginBottom: '20px'}}>
                    <AddressForm data={billingData} setData={setBillingData} dataError={billingError} setDataError={setBillingError} />
                </Collapse>
                <Divider />
            </Collapse>
            <label className="ohnohoney" htmlFor="name" />
            <input className="ohnohoney" autoComplete="new-password" type="name" id="name" name="name" placeholder="Your name here" ref={node => () => setData({...data, honeypot: node?.value})} />
            <br />
            <Button
                style={{marginBottom: '20px'}}
                disabled={!!address.shipping}
                variant="outlined"
                color="secondary"
                fullWidth
                disableGutters
                onClick={() => {
                    setData({...data, isBilling: !data.isBilling})
                    if (data.isBilling) setBillingData(emptyAddress)
                }}
            >
                {data.isBilling ? 'delete billing address' : 'add billing address'}
            </Button>
            <Button disabled={!!address.shipping || editShipping || (data.isBilling && editBilling)} variant="contained" color="secondary" fullWidth onClick={handleProceed}>{creatingUser ? <CircularProgress size={15} /> : 'proceed'}</Button>
        </form>
    )
}
const mapStateToProps = state => ({
    creatingUser: state.woocommerce.creatingUser,
    userCreated: state.woocommerce.userCreated,
    error: state.woocommerce.error,
    woocommerce: state.woocommerce,
    user: state.user,
    cart: state.cart,
})

const mapDispatchToProps = {
    updateCustomer: updateC,
    createOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreProcessAddress)
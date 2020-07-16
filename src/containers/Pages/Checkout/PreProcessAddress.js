import React, {useState} from 'react'
import {updateCustomer, createOrder} from '../../../providers/WoocommerceDataProvider/actions'
import {useDispatch, useSelector} from "react-redux"
import {
    Typography,
    Divider,
    CircularProgress,
    Grid,
    Collapse,
    TextField,
    FormControl,
    FormGroup,
    FormControlLabel,
} from "@material-ui/core"
import Button from "../../../components/Button"
import AddressForm from "../Account/AddressForm"
import {regExpEmail} from "../../../helpers";
import Checkbox from "../../../components/Checkbox";

const PreProcessAddress = ({isGuest, address, setAddress, userInfo}) => {
    const continents = useSelector(state => state.woocommerce.continents)
    const shippingEU = useSelector(state => state.woocommerce['shipping-EU-locations'])
    const shippingW = useSelector(state => state.woocommerce['shipping-W-locations'])
    const shippingITcost = useSelector(state => state.woocommerce['shipping-IT']).settings.cost.value
    const shippingEUcost = useSelector(state => state.woocommerce['shipping-EU']).settings.cost.value
    const shippingWcost = useSelector(state => state.woocommerce['shipping-W']).settings.cost.value
    const shippingRcost = useSelector(state => state.woocommerce['shipping-R']).settings.cost.value

    const creatingUser = useSelector(state => state.woocommerce.creatingUser)
    const userCreated = useSelector(state => state.woocommerce.userCreated)
    const error = useSelector(state => state.woocommerce.error)
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()

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
    const [editBilling, setEditBilling] = useState(!!billingWP.address_1)
    const [billingData, setBillingData] = useState(initialState(billingWP))
    const [shippingError, setShippingError] = useState(errorInitialState)
    const [billingError, setBillingError] = useState(errorInitialState)
    const [current, setCurrent] = useState('shipping')

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
            email: guestEmail || user.email,
        }
    }

    function handleSave() {
        setShippingError(getErrors(shippingData))
        if (editBilling)
            setBillingError(getErrors(billingData))

        if (checkAddress(getErrors(shippingData)) && (!editBilling || checkAddress(getErrors(billingData)))) {
            const shipping = saveData(shippingData)
            if (editBilling) {
                const billing = saveData(billingData)
                if(!isGuest) dispatch(updateCustomer(user.id, {shipping, billing}));
            } else if(!isGuest) dispatch(updateCustomer(user.id, {shipping}));
            setEditShipping(false)
        } else if (current === 'shipping' && checkAddress(getErrors(shippingData)))
            setCurrent('billing')
    }

    function handleChangeEmail(event) {
        setGuestEmail(event.target.value)
    }

    function handleProceed() {
        let shippingCost
        if (shippingData.country === 'Italy') shippingCost = shippingITcost
        else {
            const continent = continents?.filter(cont => cont.countries.filter(c => c.name === shippingData.country).length > 0)[0]
            if (shippingEU.filter(zone => zone.code === continent.code || zone.code === shippingData.country).length > 0)
                shippingCost = shippingEUcost
            else if (shippingW.filter(zone => zone.code === continent.code || zone.code === shippingData.country).length > 0)
                shippingCost = shippingWcost
            else shippingCost = shippingRcost
        }
        if (isGuest) {
            setGuestEmailError((!guestEmail.match(regExpEmail) || !guestEmail) && 'PLEASE ENTER A VALID EMAIL')
            if (!guestEmail.match(regExpEmail))
                return
            setAddress({shipping: saveData(shippingData), billing: saveData(billingData)})
            dispatch(createOrder({shipping: saveData(shippingData), billing: saveData(billingData, guestEmail), line_items: cartItems, shipping_lines: [{
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: shippingCost
                }]}))
            return
        }
        setAddress({shipping: saveData(shippingData), billing: billingData.address && saveData(billingData)})
        dispatch(createOrder({shipping: saveData(shippingData), billing: billingData.address && saveData(billingData), line_items: cartItems, customer_id: user.id, shipping_lines: [{
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: shippingCost
        }]}))
    }
    return (
        <form>
            <Typography variant="h1" component="h1">Address</Typography>
            <Divider />
            {userCreated && <Typography variant="body1" color="error">{error}</Typography> }
            <br />
            <Typography style={{float: 'right', margin: '10px 0'}} ><b>Shipping</b></Typography>
            <Typography style={{margin: '10px 0'}}><b>{shippingData.firstName ? `${shippingData.firstName} ${shippingData.lastName}${shippingData.company && `- ${shippingData.company}`}` : 'Name Surname'}</b></Typography>
            <Typography>{shippingData.address ? `${shippingData.address}, ${shippingData.city}, ${shippingData.postcode},${shippingData.state && `${shippingData.state}, `} ${shippingData.country}` : 'Address'}</Typography>
            {billingData.address && (
                <React.Fragment>
                    <Divider />
                    <br />
                    <Typography style={{float: 'right', margin: '10px 0'}} ><b>Billing</b></Typography>
                    <Typography style={{margin: '10px 0'}}><b>{billingData.firstName && billingData.lastName ? `${billingData.firstName} ${billingData.lastName}${billingData.company && `- ${billingData.company}`}` : 'Name Surname'}</b></Typography>
                    <Typography>{billingData.address ? `${billingData.address}, ${billingData.city}, ${billingData.postcode},${billingData.state && `${billingData.state}, `} ${billingData.country}` : 'Address'}</Typography>
                </React.Fragment>
            )}
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

            <Collapse in={(editShipping && !address.shipping)} style={{marginBottom: '20px'}}>
                <br />
                <Divider />
                <br />
                <Typography variant="h2">{current}</Typography>
                <br />
                {current === 'shipping' && <AddressForm data={shippingData} setData={setShippingData} dataError={shippingError} setDataError={setShippingError} />}
                {current === 'billing' && <AddressForm data={billingData} setData={setBillingData} dataError={billingError} setDataError={setBillingError} />}
                <FormControl component="fieldset" style={{width: '100%', padding: '10px 3px'}}>
                    <FormGroup aria-label="position" style={{flexDirection: 'row-reverse'}}>
                        {editBilling && (
                            <FormControlLabel
                                style={{marginLeft: '20px', marginRight: 0}}
                                value="billing"
                                control={
                                    <Checkbox
                                        edge="end"
                                        fill
                                        checked={current === 'billing'}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                        onChange={() => setCurrent('billing')}
                                    />}
                                label="billing"
                                labelPlacement="start"
                            />
                        )}
                        <FormControlLabel
                            style={{marginRight: 0}}
                            value="shipping"
                            control={
                                <Checkbox
                                    edge="end"
                                    fill
                                    checked={current === 'shipping'}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    onChange={() => setCurrent('shipping')}

                                />}
                            label="shipping"
                            labelPlacement="start"
                        />
                    </FormGroup>
                </FormControl>
            </Collapse>
            <Divider/>

            <label className="ohnohoney" htmlFor="name" />
            <input className="ohnohoney" autoComplete="new-password" type="name" id="name" name="name" placeholder="Your name here" ref={node => () => setData({...data, honeypot: node?.value})} />
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button
                        style={{marginBottom: '20px'}}
                        disabled={!!address.shipping}
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        disableGutters
                        onClick={() => {
                            setData({...data, isBilling: !data.isBilling})
                            if (data.isBilling) {
                                setEditBilling(false)
                                setBillingData(emptyAddress)
                                setCurrent('shipping')
                            }
                            else {
                                setCurrent('billing')
                                setEditShipping(true)
                                setEditBilling(true)
                            }
                        }}
                    >
                        {data.isBilling ? 'same as shipping address' : 'different billing address'}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    {editShipping ?
                        <Button disabled={!!address.shipping} fullWidth diableGutters variant="contained" color="secondary" onClick={handleSave}><b>Save</b></Button> :
                        <Button disabled={!!address.shipping} fullWidth diableGutters variant="contained" color="secondary"  onClick={() => setEditShipping(true)}><b>Edit</b></Button>
                    }
                </Grid>
            </Grid>
            <Button disabled={!!address.shipping || editShipping} variant="contained" color="secondary" fullWidth onClick={handleProceed}>{creatingUser ? <CircularProgress size={15} /> : 'proceed'}</Button>
        </form>
    )
}

export default PreProcessAddress
import React, {useState} from 'react'
import {updateCustomer} from '../../../providers/WoocommerceDataProvider/actions'
import {useDispatch, useSelector} from "react-redux"
import {
    Typography,
    CircularProgress,
    Grid, FormGroup, FormControlLabel, FormControl,
} from "@material-ui/core"
import Button from "../../../components/Button"
import AddressForm from "./AddressForm"
import Checkbox from "../../../components/Checkbox";

const AddressBook = ({userId, shippingWP, billingWP, isMobile}) => {
    const creatingUser = useSelector(state => state.woocommerce.creatingUser)
    const userCreated = useSelector(state => state.woocommerce.userCreated)
    const error = useSelector(state => state.woocommerce.error)
    const dispatch = useDispatch()
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
    const [billingData, setBillingData] = useState(initialState(billingWP))
    const [shippingError, setShippingError] = useState(errorInitialState)
    const [billingError, setBillingError] = useState(errorInitialState)
    const [current, setCurrent] = useState('shipping')

    const [data, setData] = useState({
        isShipping: !!shippingWP.address_1,
        isBilling: !!billingWP.address_1,
        honeypot: false,
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

    const saveData = (address) => {
        return {
            first_name: address.firstName,
            last_name: address.lastName,
            company: address.company,
            address_1: address.address,
            city: address.city,
            postcode: address.postcode,
            country: address.country,
            state: address.state,
        }
    }

    function handleSave() {
        setShippingError(getErrors(shippingData))
        setBillingError(getErrors(billingData))

        if (checkAddress(getErrors(shippingData)) && (!data.isBilling || checkAddress(getErrors(billingData))) ) {
            const shipping = saveData(shippingData)
            const billing = saveData(billingData)
            dispatch(updateCustomer(userId, {shipping, billing}))
        }
        else {
            if (!checkAddress(getErrors(shippingData))) setCurrent('shipping')
            else setCurrent('billing')
        }
    }

    function handleBillingClick() {
        if(!data.isBilling) {
            setData({...data, isBilling: true})
            setCurrent('billing')
        }
        else {
            setData({...data, isBilling: false})
            setBillingData({
                firstName: '',
                lastName: '',
                company: '',
                address: '',
                city: '',
                postcode: '',
                country: '',
                state: '',
            })
            setCurrent('shipping')
        }
    }

    return (
        <form>
            <Typography variant={isMobile ? 'h2' : 'h1'}  component="h1">Address book</Typography>
            {!error && userCreated && <Typography variant="body1">ADDRESS BOOK SUCCESSFULLY UPDATED</Typography> }
            {userCreated && <Typography variant="body1" color="error">{error}</Typography> }
            {isMobile && <br />}
            {!data.isShipping && (
                <React.Fragment>
                    <Typography style={{marginBottom: '10px'}} color="secondary" variant="h1" component="h1">No address saved</Typography>
                    <Button variant="contained" color="secondary" fullWidth onClick={() => setData({...data, isShipping: true})}>add new address</Button>
                </React.Fragment>
            )}
            {data.isShipping && current === 'shipping' && (
                <React.Fragment>
                    <Typography style={{marginTop: '20px'}} variant="h2" component="h2">Shipping address</Typography>
                    <AddressForm data={shippingData} setData={setShippingData} dataError={shippingError} setDataError={setShippingError} />
                </React.Fragment>
            )}
            {data.isBilling && current === 'billing' && (
                <React.Fragment>
                    <Typography style={{marginTop: '20px'}} variant="h2" component="h2">Billing address</Typography>
                    <AddressForm data={billingData} setData={setBillingData} dataError={billingError} setDataError={setBillingError} />
                </React.Fragment>
            )}

            <label className="ohnohoney" htmlFor="name" />
            <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => () => setData({...data, honeypot: node?.value})} />

            <FormControl component="fieldset" style={{width: '100%', padding: '10px 3px'}}>
                <FormGroup aria-label="position" style={{flexDirection: 'row-reverse'}}>
                    {data.isBilling && (
                        <FormControlLabel
                            style={{marginLeft: '20px', marginRight: 0}}
                            value="billing"
                            control={
                                <Checkbox
                                    fill
                                    checked={current === 'billing'}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    onChange={() => setCurrent('billing')}
                                />}
                            label="billing"
                            labelPlacement="end"
                        />
                    )}
                    <FormControlLabel
                        style={{marginRight: 0}}
                        value="shipping"
                        control={
                            <Checkbox
                                fill
                                checked={current === 'shipping'}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={() => setCurrent('shipping')}
                            />}
                        label="shipping"
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button variant="outlined" color="secondary" fullWidth onClick={handleBillingClick}>{data.isBilling ? 'Remove billing Address': 'Add billing address'}</Button>
                </Grid>
                <Grid item xs={6}>
                    {data.isShipping && <Button variant="contained" color="secondary" fullWidth onClick={handleSave}>{creatingUser ? <CircularProgress size={15} /> : 'save'}</Button>}
                </Grid>
            </Grid>

        </form>
    )
}

export default AddressBook
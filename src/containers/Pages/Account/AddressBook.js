import React, {useState} from 'react'
import {updateCustomer as updateC} from '../../../providers/WoocommerceDataProvider/actions'
import {connect} from "react-redux"
import {
    Typography,
    CircularProgress,
} from "@material-ui/core"
import Button from "../../../components/Button"
import AddressForm from "./AddressForm"

const AddressBook = ({userId, creatingUser, userCreated, updateCustomer, shippingWP, billingWP, error}) => {
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
            updateCustomer(userId, {shipping, billing});
        }
    }

    return (
        <form>
            <Typography variant="h1" component="h1">Address book</Typography>
            {!error && userCreated && <Typography variant="body1">ADDRESS BOOK SUCCESSFULLY UPDATED</Typography> }
            {userCreated && <Typography variant="body1" color="error">{error}</Typography> }
            {!data.isShipping && (
                <React.Fragment>
                    <Typography style={{marginBottom: '10px'}} color="secondary" variant="h1" component="h1">No address saved</Typography>
                    <Button variant="contained" color="secondary" fullWidth onClick={() => setData({...data, isShipping: true})}>add new address</Button>
                </React.Fragment>
            )}
            {data.isShipping && (
                <React.Fragment>
                    <Typography style={{marginTop: '20px'}} variant="h2" component="h2">Shipping address</Typography>
                    <AddressForm data={shippingData} setData={setShippingData} dataError={shippingError} setDataError={setShippingError} />
                    {!data.isBilling && <div style={{padding: '10px 0 20px', textAlign: 'right'}}><Button disableGutters onClick={() => setData({...data, isBilling: true})}>Add billing address</Button></div>}
                </React.Fragment>
            )}
            {data.isBilling && (
                <React.Fragment>
                    <Typography style={{marginTop: '40px'}} variant="h2" component="h2">Billing address</Typography>
                    <AddressForm data={billingData} setData={setBillingData} dataError={billingError} setDataError={setBillingError} />
                    <div style={{padding: '10px 0 20px', textAlign: 'right'}}><Button disableGutters onClick={() => {
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
                    }}>delete billing address</Button></div>
                </React.Fragment>
            )}

            <label className="ohnohoney" htmlFor="name" />
            <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => () => setData({...data, honeypot: node?.value})} />

            {data.isShipping && <Button variant="contained" color="secondary" fullWidth onClick={handleSave}>{creatingUser ? <CircularProgress size={15} /> : 'save'}</Button>}
        </form>
    )
}
const mapStateToProps = state => ({
    creatingUser: state.woocommerce.creatingUser,
    userCreated: state.woocommerce.userCreated,
    error: state.woocommerce.error
})

const mapDispatchToProps = {
    updateCustomer: updateC,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook)
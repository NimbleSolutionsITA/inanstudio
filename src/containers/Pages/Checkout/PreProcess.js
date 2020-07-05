import React, {useState} from 'react'
import PreProcessAddress from "./PreProcessAddress";
import SplitLayout from "../../../components/SplitLayout";
import PreProcessPay from "./PreProcessPay";
import PaypalButton from "./PaypalButton";
import {useSelector} from "react-redux";

const PreProcess = ({isGuest, setPaypalSuccess, setPaypalError}) => {
    const [address, setAddress] = useState({shipping: null, billing: null})
    const [isCheckoutReady, setIsCheckoutReady] = useState(false)
    const user = useSelector(state => state.user)
    const userInfo = useSelector(state => state.woocommerce[`customers-${user.id}`])
    return (
        <SplitLayout
            left={<PreProcessAddress userInfo={isGuest ? null : userInfo} address={address} setAddress={setAddress} isGuest={isGuest} />}
            right={isCheckoutReady ?
                <PaypalButton setPaypalSuccess={setPaypalSuccess} setPaypalError={setPaypalError} /> :
                <PreProcessPay setIsCheckoutReady={setIsCheckoutReady} address={address} />}
        />
    )
}

export default PreProcess
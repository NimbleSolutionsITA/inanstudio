import React, {useState} from 'react'
import PreProcessAddress from "./PreProcessAddress";
import SplitLayout from "../../../components/SplitLayout";
import PreProcessPay from "./PreProcessPay";
import PaypalButton from "./PaypalButton";

const PreProcess = ({isGuest, setPaypalSuccess, setPaypalError}) => {
    const [address, setAddress] = useState({shipping: null, billing: null})
    const [isCheckoutReady, setIsCheckoutReady] = useState(false)
    return (
        <SplitLayout
            left={<PreProcessAddress address={address} setAddress={setAddress} isGuest={isGuest} />}
            right={isCheckoutReady ?
                <PaypalButton setPaypalSuccess={setPaypalSuccess} setPaypalError={setPaypalError} /> :
                <PreProcessPay setIsCheckoutReady={setIsCheckoutReady} address={address} />}
        />
    )
}

export default PreProcess
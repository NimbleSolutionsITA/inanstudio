import React, {useState} from "react"
import Button from "../../../components/Button";
import RightDrawer from "../../../components/RightDrawer";
import {FormControl, TextField, Typography} from "@material-ui/core";
import styled from "styled-components";
import {baseUrl} from "../../../constants";
import {regExpEmail} from "../../../helpers";

const GetNotifiedTitleWrapper = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid;
  margin-bottom: 10px;
`
const GetNotifiedInputWrapper = styled.div`
  padding: 20px 0;
`

const GetNotified = ({ isMobile, leatherType, colorType, sizeType, itemId, product }) => {
    const [openPreOrder, setOpenPreOrder] = useState(false)
    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [emailSuccess, setEmailSuccess] = React.useState(false)
    const [honeypot, setHoneypot] = useState(false)

    const handleChange = (event) => {
        setEmailError(false)
        setEmail(event.target.value)
    }

    const handleGetNotifiedSubmit = () => {
        if (!email) {
            setEmailError('email is required')
            return
        }
        if (regExpEmail.test(email) && !honeypot) {
            setEmailError(false)
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("id", itemId);
            formdata.append("product", product.name);

            if(leatherType) formdata.append('leather', leatherType)
            if(colorType) formdata.append('color', colorType)
            if(sizeType) formdata.append('size', sizeType)

            const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${baseUrl}/wp-json/contact-form-7/v1/contact-forms/124/feedback`, requestOptions)
                .then(response => response.text())
                .then(() => setEmailSuccess(true))
                .catch(error => console.log('error', error));
        }
        else setEmailError('Invalid email address')
    }

    return (
        <React.Fragment>
            <Button fullWidth color="secondary" variant="contained" onClick={() => setOpenPreOrder(true)}>get notified</Button>
            <RightDrawer open={openPreOrder} setOpen={setOpenPreOrder}>
                <GetNotifiedTitleWrapper>
                    <Typography variant="h3" component="h3">Get notified</Typography>
                </GetNotifiedTitleWrapper>
                {emailSuccess ? (
                    <React.Fragment>
                        <Typography variant={isMobile ? 'h1' : 'h2'} component="h3">Thank you</Typography>
                        <Typography variant="body1" component="p">email submitted succesfully.</Typography>
                        <Typography variant={isMobile ? 'h1' : 'h2'} component="h3">we will notify you when this item is back in stock.</Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography variant="body1" component="p">by entering your email below, you will be notfied when this product is
                            available.</Typography>
                        <GetNotifiedInputWrapper>
                            <FormControl fullWidth>
                                <TextField
                                    placeholder="ENTER YOUR EMAIL"
                                    required
                                    autoComplete="email"
                                    error={!!emailError}
                                    label="EMAIL"
                                    helperText={emailError}
                                    fullWidth
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        disableAnimation: true,
                                        focused: false,
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </GetNotifiedInputWrapper>
                        <label className="ohnohoney" htmlFor="name" />
                        <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => setHoneypot(node?.value)} />
                        <Button fullWidth color="secondary" variant="contained" type="submit" onClick={handleGetNotifiedSubmit}>Get notified</Button>
                    </React.Fragment>
                )}
            </RightDrawer>
        </React.Fragment>
    )
}

export default GetNotified
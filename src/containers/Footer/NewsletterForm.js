import React, {useState} from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import {FormControl, TextField, Divider, FormControlLabel, Typography} from "@material-ui/core"
import Link from "../../components/Link"
import Checkbox from "../../components/Checkbox";
import {regExpEmail} from "../../helpers";


const NewsletterForm = ({isMobile, isModal, sendFeedback}) => {
    const [email, setEmail] = useState('')
    const [consent, setConsent] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [honeypot, setHoneypot] = useState(false)
    const [emailError, setEmailError] = React.useState(null)

    const handleChange = (event) => {
        setEmailError(null)
        setEmail(event.target.value)
    }

    const submit = (subscribe) => {
        if(consent) {
            if (!email) {
                setEmailError('email is required')
                return
            }
            if (regExpEmail.test(email)) {
                if (!honeypot) {
                    setEmailError(null)
                    subscribe({ EMAIL: email })
                    setSubscribed(true)
                    setEmail('THANK YOU FOR SUBSCRIBING')
                    if(isModal)
                        sendFeedback(true)
                }
            }
            else setEmailError('Invalid email address')
        }
    }

    return (
            <MailchimpSubscribe
                url="https://inanstudio.us19.list-manage.com/subscribe/post?u=0c90b1042e8429340f3192a62&amp;id=339f883724"
                render={({ subscribe, status, message }) => (
                    <React.Fragment>
                        <div style={{display: 'flex', marginBottom: '5px'}}>
                            {!isMobile && !isModal && <div style={{marginRight: '10px', padding: '6px 0'}}><b>NEWSLETTER</b> |</div>}
                            <div
                                style={{
                                    flexGrow: 1,
                                    position: 'relative',
                                    marginTop: '-3px',
                                }}
                            >
                                <FormControl fullWidth style={{borderBottom: isMobile && '1px solid #fff', paddingBottom: isMobile && '5px', marginBottom: isMobile && '10px'}}>
                                    <TextField
                                        placeholder={subscribed ? 'THANK YOU FOR SUBSCRIBING' : 'YOUR EMAIL'}
                                        required
                                        disabled={subscribed}
                                        error={!!emailError}
                                        helperText={emailError}
                                        fullWidth
                                        type="email"
                                        value={email}
                                        onChange={handleChange}
                                        InputProps={{
                                            style: {color: (isMobile || isModal) && '#fff', borderBottom: isMobile && 'none'},
                                            disableUnderline: true
                                        }}
                                        InputLabelProps={{
                                            disableAnimation: true,
                                            focused: false,
                                            shrink: true,
                                        }}

                                    />
                                </FormControl>
                                <label className="ohnohoney" htmlFor="name" />
                                <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => setHoneypot(node?.value)} />
                            </div>
                            {!isMobile && !isModal && (
                                <div style={{marginLeft: '10px', padding: '8px 0'}}>
                                    <Link color="secondary" href="https://instagram.com/inan_studio" target="_blank" rel="noopener noreferrer">
                                        <b>Instagram</b>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {(email || isModal) && (
                            <React.Fragment>
                                <Divider style={{backgroundColor: isModal && '#fff'}} />
                                <div style={{marginBottom: '30px'}}>
                                    {subscribed ? <Typography variant="h2">THANK YOU</Typography> : (
                                        <React.Fragment>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onBlack={isMobile || isModal}
                                                        fill
                                                        checked={consent}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        onChange={() => setConsent(!consent)}
                                                    />}
                                                label={<Typography color="secondary">i have read, understood and agree to the <Link underline="always" color="secondary" to="/legal-area/privacy-policy">privacy and data protection policy</Link></Typography>}
                                                labelPlacement="end"
                                            />
                                            {consent && <Link style={{float: 'right', color: (isMobile || isModal) ? '#fff' : '#000', fontWeight: 'bold'}} onClick={e => submit(subscribe)}>SUBSCRIBE</Link>}
                                        </React.Fragment>
                                    )}
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            />
    )
}

export default NewsletterForm
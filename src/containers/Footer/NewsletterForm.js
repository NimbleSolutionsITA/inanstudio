import React, {useState} from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import {FormControl, TextField} from "@material-ui/core"
import Link from "../../components/Link"
import {regExpEmail} from "../../helpers";


const NewsletterForm = ({isMobile}) => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const [honeypot, setHoneypot] = useState(false)
    const [emailError, setEmailError] = React.useState(null)

    const handleChange = (event) => {
        setEmailError(null)
        setEmail(event.target.value)
    }

    const submit = (e, subscribe) => {
        if(e.keyCode === 13 || e.type === 'click') {
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
                }
            }
            else setEmailError('Invalid email address')
        }
    }

    return (
        <MailchimpSubscribe
            url="https://inanstudio.us19.list-manage.com/subscribe/post?u=0c90b1042e8429340f3192a62&amp;id=339f883724"
            render={({ subscribe, status, message }) => (
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
                            onKeyUp={e => submit(e, subscribe)}
                            InputProps={{
                                style: {color: isMobile && '#fff', borderBottom: isMobile && 'none'},
                                disableUnderline: true
                            }}

                        />
                    </FormControl>
                    <label className="ohnohoney" htmlFor="name" />
                    <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => setHoneypot(node?.value)} />
                    {isMobile && (
                        <Link style={{float: 'right'}} onClick={e => submit(e, subscribe)}>SUSCRIBE</Link>
                    )}
                </div>
            )}
        />
    )
}

export default NewsletterForm
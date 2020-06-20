import React, {useState} from 'react'
import {connect} from "react-redux";
import {login} from "../../../providers/AuthProvider/actions"
import {regExpEmail} from "../../../constants"
import {Redirect} from "react-router"
import {Typography, Divider, Grid, TextField, FormControl, CircularProgress} from "@material-ui/core"
import Button from "../../../components/Button"
import Link from "../../../components/Link";

const Login = ({authenticated, authenticating, login, error}) => {
    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [password, setPassword] = useState( '' )
    const [passwordError, setPasswordError] = React.useState('')
    const handleChange = (event) => {
        if (event.target.type === 'email') {
            setEmailError(false)
            setEmail(event.target.value)
        }
        else {
            setPassword(event.target.value)
        }
    }
    function handleLogin() {
        if (!email) {
            setEmailError('YOUR EMAIL IS REQUIRED')
            return
        }
        else if (!regExpEmail.test(email)) {
            setEmailError('PLEASE ENTER A VAILD EMAIL ADDRESS')
            return
        }
        else if (!password) {
            setPasswordError('YOUR PASSWORD IS REQUIRED')
            return
        }
        else login(email, password);
    }
    return (
        <Grid style={{marginTop: '20px'}} container spacing={4}>
            {authenticated && <Redirect to="/" />}
            <Grid item xs={12} md={6}>
                <Typography variant="h1" component="h1">Log in</Typography>
                <Divider />
                {error && <Typography color="error" variant="body1">{error}</Typography> }
                <FormControl fullWidth style={{marginTop: '10px'}}>
                    <TextField
                        placeholder="ENTER YOUR EMAIL"
                        required
                        error={emailError}
                        label="EMAIL"
                        helperText={emailError}
                        fullWidth
                        type="email"
                        value={email}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <div style={{position: 'relative', marginTop: '10px', marginBottom: '25px'}}>
                    <Link style={{position: 'absolute', top: '5px', right: 0, zIndex: 1}} color="error" to="/account/reset-password">Forgot Password?</Link>
                    <FormControl fullWidth>
                        <TextField
                            placeholder="ENTER YOUR PASSWORD"
                            required
                            error={passwordError}
                            label="PASSWORD"
                            helperText={passwordError}
                            fullWidth
                            type="password"
                            value={password}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </div>
                <Button variant="contained" color="secondary" fullWidth onClick={handleLogin}>{authenticating ? <CircularProgress size={15} /> : 'log in'}</Button>
            </Grid>
            <Grid item xs={12} md={6} style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h1" component="h1">Register</Typography>
                <Divider />
                <div style={{flexGrow: 1, paddingTop: '20px'}}>
                    <Typography variant="body1" component="p">REGISTER TO COMPLETE CHECKOUT MORE QUICKLY, REVIEW ORDER INFORMATION and much more.</Typography>
                </div>
                <Button to="/account/register" variant="contained" color="secondary" fullWidth>Register</Button>
            </Grid>
        </Grid>
    )
}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    authenticating: state.user.authenticating,
    error: state.user.error,
})

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
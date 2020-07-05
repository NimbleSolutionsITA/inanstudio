import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Typography, TextField, FormControl, CircularProgress} from "@material-ui/core"
import {regExpEmail} from "../helpers";
import {login} from "../providers/AuthProvider/actions"
import Button from "../components/Button"
import Link from "../components/Link";

const LoginForm = () => {
    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [password, setPassword] = useState( '' )
    const [passwordError, setPasswordError] = React.useState('')

    const dispatch = useDispatch()
    const { authenticating, error } = useSelector(state => state.user)

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
        else dispatch(login(email, password));
    }
    return (
        <form>
            {error && <Typography color="error" variant="body1">{error}</Typography> }
            <FormControl fullWidth style={{marginTop: '10px'}}>
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
                        autoComplete="password"
                        error={!!passwordError}
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
        </form>
    )
}

export default LoginForm
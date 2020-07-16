import React, {useState} from "react"
import Wordpress from '@wordpress/api-fetch'
import {baseUrl} from "../../../constants"
import {regExpEmail} from "../../../helpers";
import {
    Divider,
    FormControl,
    Grid, IconButton, InputAdornment,
    TextField,
    Typography, useMediaQuery, useTheme
} from "@material-ui/core";
import Button from "../../../components/Button";

const ResetPassword = () => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const [data, setData] = useState({
        email: null,
        password: null,
        code: null,
        confirmPassword: null,
        showPassword: false,
        showConfirmPassword: false,
        honeypot: false,
        emailSent: false,
        validCode: false,
        resetSuccess: false,
    })
    const [dataError, setDataError] = useState({
        email: false,
        password: false,
        code: false,
        confirmPassword: false,
    })
    const handleChange = (event, field) => {
        const value = event.target.value
        if (field === 'code' && data.email && regExpEmail.test(data.email) && value.length === 4) {
            setData({...data, code: value})
            Wordpress( {
                path: `${baseUrl}wp-json/bdpwr/v1/validate-code`,
                method: 'POST',
                data: { email: data.email, code: value }
            } )
                .then(response => {
                    setData({...data, code: value, validCode: response.message})
                })
                .catch(error => {
                    setData({...data, code: value, validCode: false})
                    if (error.message) setDataError({...dataError, code: error.message})
                });
            return
        }
        if (field === 'code' && value.length > 4) return
        setDataError({...dataError, [field]: false})
        setData({...data, [field]: event.target.value})
    }
    const handleClickShowPassword = () => {
        setData({ ...data, showPassword: !data.showPassword });
    };
    const handleClickShowConfirmPassword = () => {
        setData({ ...data, showConfirmPassword: !data.showConfirmPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    function handleReset() {
        setDataError({
            email: !data.email ? 'EMAIL IS REQUIRED' : !regExpEmail.test(data.email) && 'PLEASE ENTER A VALID EMAIL ADDRESS',
            password: !data.password && 'PASSWORD IS REQUIRED',
            confirmPassword: data.password !== data.confirmPassword && 'PASSWORD DOES NOT MATCH',
            code: data.code.length !== 4 ? 'CODE MUST BE 4 DIGITS' : dataError.code
        })
        if (data.validCode && data.email && regExpEmail.test(data.email) && data.password && data.password === data.confirmPassword && !data.honeypot) {
            Wordpress( {
                path: `${baseUrl}wp-json/bdpwr/v1/set-password`,
                method: 'POST',
                data: { email: data.email, code: data.code, password: data.password }
            } )
                .then(response => {
                    setData({...data, resetSuccess: response.message})
                });
        }
    }
    function handleSubmit() {
        setDataError({
            email: !data.email ? 'EMAIL IS REQUIRED' : !regExpEmail.test(data.email) && 'PLEASE ENTER A VALID EMAIL ADDRESS'
        })
        if (data.email && !data.honeypot) {
            Wordpress( {
                path: `${baseUrl}wp-json/bdpwr/v1/reset-password`,
                method: 'POST',
                data: { email: data.email }
            } )
                .then(response => {
                    setData({...data, emailSent: response.message})
                })
                .catch(error => setDataError({...dataError, email: error.message}));
        }
    }
    return (
        <Grid style={{marginTop: isMobile ? 0 : '20px'}} container spacing={isMobile ? 0 : 4}>
            <Grid item xs={12} md={12}>
                {isMobile && <br />}
                {isMobile && <br />}
                <Typography variant="h1" component="h1">Reset password</Typography>
                {!isMobile && <Divider />}
                {!data.resetSuccess && data.emailSent ? (
                    <Typography variant="body1" component="p">{data.emailSent}</Typography>
                ) : (
                    <Typography variant="body1" component="p">Enter the email address associated with your account. You will shortly recieve an email to reset your password.</Typography>
                ) }
            </Grid>
            <Grid item xs={12} md={6}>
                {data.resetSuccess ? (
                    <Typography variant="h1" component="h1">{data.resetSuccess}</Typography>
                ) : (
                    data.emailSent ? (
                        <form>
                            <FormControl fullWidth style={{marginTop: '10px'}}>
                                <TextField
                                    InputLabelProps={{
                                        disableAnimation: true
                                    }}
                                    placeholder="ENTER YOUR EMAIL"
                                    required
                                    error={!!dataError.email}
                                    label="EMAIL"
                                    helperText={dataError.email}
                                    fullWidth
                                    type="email"
                                    value={data.email}
                                    onChange={(event) => handleChange(event, 'email')}
                                />
                            </FormControl>
                            <FormControl fullWidth style={{marginTop: '10px'}}>
                                <TextField
                                    InputLabelProps={{
                                        disableAnimation: true
                                    }}
                                    placeholder="ENTER THE 4 DIGIT CODE RECEIVED BY EMAIL"
                                    required
                                    error={!!dataError.code}
                                    label="code"
                                    helperText={dataError.code || data.validCode}
                                    fullWidth
                                    type="number"
                                    value={data.code}
                                    onChange={(event) => handleChange(event, 'code')}
                                />
                            </FormControl>
                            <FormControl fullWidth style={{marginTop: '10px'}}>
                                <TextField
                                    placeholder="ENTER YOUR PASSWORD"
                                    required
                                    error={!!dataError.password}
                                    label="PASSWORD"
                                    helperText={dataError.password}
                                    fullWidth
                                    type={data.showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(event) => handleChange(event, 'password')}
                                    InputLabelProps={{
                                        disableAnimation: true
                                    }}
                                    InputProps={{endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {data.showPassword ? <Typography variant="body2">HIDE</Typography> : <Typography variant="body2">SHOW</Typography>}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth style={{marginTop: '10px', marginBottom: '20px'}}>
                                <TextField
                                    placeholder="CONFIRM YOUR PASSWORD"
                                    required
                                    error={!!dataError.confirmPassword}
                                    label="CONFIRM PASSWORD"
                                    helperText={dataError.confirmPassword}
                                    fullWidth
                                    type={data.showConfirmPassword ? 'text' : 'password'}
                                    value={data.confirmPassword}
                                    onChange={(event) => handleChange(event, 'confirmPassword')}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {data.showConfirmPassword ? <Typography variant="body2">HIDE</Typography> : <Typography variant="body2">SHOW</Typography>}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                    InputLabelProps={{
                                        disableAnimation: true
                                    }}
                                />
                            </FormControl>
                            <label className="ohnohoney" htmlFor="name" />
                            <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => () => setData({...data, honeypot: node?.value})} />
                            <Button variant="contained" color="secondary" fullWidth onClick={handleReset}>Reset</Button>
                        </form>
                    ) : (
                        <form>
                            <FormControl fullWidth style={{marginBottom: '20px'}}>
                                <TextField
                                    disableAnimation
                                    placeholder="ENTER YOUR EMAIL"
                                    required
                                    error={!!dataError.email}
                                    label="EMAIL"
                                    helperText={dataError.email}
                                    fullWidth
                                    type="email"
                                    value={data.email}
                                    onChange={(event) => handleChange(event, 'email')}
                                    InputLabelProps={{
                                        disableAnimation: true
                                    }}
                                />
                            </FormControl>
                            <label className="ohnohoney" htmlFor="name" />
                            <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => () => setData({...data, honeypot: node?.value})} />
                            <Button variant="contained" color="secondary" fullWidth onClick={handleSubmit}>submit</Button>
                        </form>
                    )
                )}
            </Grid>
        </Grid>
    )
}

export default ResetPassword
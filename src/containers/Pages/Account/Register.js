import React, {useState} from 'react'
import {
    Typography,
    Divider,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    CircularProgress,
    FormControlLabel, useTheme, useMediaQuery
} from "@material-ui/core"
import Button from "../../../components/Button"
import {registerCustomer as registerC} from '../../../providers/WoocommerceDataProvider/actions'
import {connect} from "react-redux"
import Checkbox from "../../../components/Checkbox"
import Link from "../../../components/Link"

import {regExpEmail} from "../../../helpers";

const Register = ({userCreated, creatingUser, registerCustomer, error}) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const [data, setData] = useState({
        firstName: null,
        lastName: null,
        email: null,
        newsletter: false,
        password: null,
        confirmPassword: null,
        showPassword: false,
        showConfirmPassword: false,
        honeypot: false,
    })
    const [dataError, setDataError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    })
    const handleChange = (event, field) => {
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
    function handleRegister() {
        setDataError({
            email: !data.email ? 'EMAIL IS REQUIRED' : !regExpEmail.test(data.email) && 'PLEASE ENTER A VALID EMAIL ADDRESS',
            firstName: !data.firstName && 'FIRST NAME IS REQUIRED',
            lastName: !data.lastName && 'LAST NAME IS REQUIRED',
            password: !data.password && 'PASSWORD IS REQUIRED',
            confirmPassword: data.password !== data.confirmPassword && 'PASSWORD DOES NOT MATCH',
        })
        if (data.email && data.firstName && data.lastName && regExpEmail.test(data.email) && data.password && data.password === data.confirmPassword && !data.honeypot)
            registerCustomer(data);
    }
    return (
        <Grid style={{marginTop: isMobile ? 0 : '20px'}} container spacing={isMobile ? 0 : 4}>
            <Grid item xs={12} md={12}>
                {userCreated ? (
                    <Typography style={{marginTop: '10px'}} variant="h1" component="h1">CONGRATULATIONS! ACCOUNT CREATED SUCCESSFULLY</Typography>
                ) : (
                    <React.Fragment>
                        <Typography variant="h1" component="h1">Create new account</Typography>
                        {!isMobile && <Divider />}
                        {error ? (
                            <Typography color="error" variant="body1" component="p">{error}</Typography>
                        ) : (
                            <Typography variant="body1" component="p">REGISTER TO COMPLETE CHECKOUT MORE QUICKLY, REVIEW ORDER INFORMATION and much more.</Typography>
                        )}
                    </React.Fragment>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                {!userCreated && (
                    <form>
                        <Grid container spacing={isMobile ? 0 : 4}>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth style={{marginTop: '10px'}}>
                                    <TextField
                                        placeholder="ENTER YOUR FIRST NAME"
                                        required
                                        autoComplete="given-name"
                                        error={!!dataError.firstName}
                                        label="FIRST NAME"
                                        helperText={dataError.firstName}
                                        fullWidth
                                        type="text"
                                        value={data.firstName}
                                        onChange={(event) => handleChange(event, 'firstName')}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth style={{marginTop: '10px'}}>
                                    <TextField
                                        placeholder="ENTER YOUR LAST NAME"
                                        required
                                        autoComplete="family-name"
                                        error={!!dataError.lastName}
                                        label="LAST NAME"
                                        helperText={dataError.lastName}
                                        fullWidth
                                        type="text"
                                        value={data.lastName}
                                        onChange={(event) => handleChange(event, 'lastName')}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl fullWidth style={{marginTop: '10px'}}>
                            <TextField
                                placeholder="ENTER YOUR EMAIL"
                                required
                                autoComplete="email"
                                error={!!dataError.email}
                                label="EMAIL"
                                helperText={dataError.email}
                                fullWidth
                                type="email"
                                value={data.email}
                                onChange={(event) => handleChange(event, 'email')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <Grid container spacing={isMobile ? 0 : 4}>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth style={{marginTop: '10px'}}>
                                    <TextField
                                        placeholder="ENTER YOUR PASSWORD"
                                        required
                                        autoComplete="password"
                                        error={!!dataError.password}
                                        label="PASSWORD"
                                        helperText={dataError.password}
                                        fullWidth
                                        type={data.showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(event) => handleChange(event, 'password')}
                                        InputLabelProps={{
                                            shrink: true,
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
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth style={{marginTop: '10px'}}>
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
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{endAdornment:
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
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl fullWidth style={{margin: '10px 0',}}>
                        <FormControlLabel
                            value={data.newsletter}
                            control={
                                <Checkbox
                                    fill
                                    checked={data.newsletter}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    onChange={() => setData({...data, newsletter: !data.newsletter})}
                                />}
                            label="SUBSCRIBE TO OUR NEWSLETTER"
                            labelPlacement="end"
                        />
                        </FormControl>
                        <label className="ohnohoney" htmlFor="name" />
                        <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => () => setData({...data, honeypot: node?.value})} />
                        <Button variant="contained" color="secondary" fullWidth onClick={handleRegister}>{creatingUser ? <CircularProgress size={15} /> : 'register'}</Button>
                        <Typography style={{marginTop: '5px'}} variant="body1" component="p">BY CLICKING 'REGISTER', YOU AGREE TO OUR <Link color="inherit" to="/legal-area/terms-and-conditions" target="_blank" >TERMS & CONDITIONS AND PRIVACY & COOKIES POLICY.</Link></Typography>
                        </form>
                )}
            </Grid>
        </Grid>
    )
}
const mapStateToProps = state => ({
    creatingUser: state.woocommerce.creatingUser,
    userCreated: state.woocommerce.userCreated,
    error: state.woocommerce.error
})

const mapDispatchToProps = {
    registerCustomer: registerC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)
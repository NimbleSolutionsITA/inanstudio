import React, {useState} from 'react'
import {updateCustomer as updateC} from '../../../providers/WoocommerceDataProvider/actions'
import {connect} from "react-redux"
import {regExpEmail} from "../../../helpers";
import {
    Typography,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    CircularProgress,
} from "@material-ui/core"
import Button from "../../../components/Button"

const PersonalInfo = ({userId, creatingUser, userCreated, updateCustomer, email, firstName, lastName, error}) => {
    const initialState = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        newsletter: false,
        password: null,
        confirmPassword: null,
        showPassword: false,
        showConfirmPassword: false,
        changePassword: false,
        honeypot: false,
    }
    const [data, setData] = useState(initialState)

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
    function handleCancel() {
        setData(initialState)
    }
    function handleSave() {
        setDataError({
            email: !data.email ? 'EMAIL IS REQUIRED' : !regExpEmail.test(data.email) && 'PLEASE ENTER A VALID EMAIL ADDRESS',
            firstName: !data.firstName && 'FIRST NAME IS REQUIRED',
            lastName: !data.lastName && 'LAST NAME IS REQUIRED',
            password: data.changePassword && !data.password && 'PASSWORD IS REQUIRED',
            confirmPassword: data.changePassword && data.password !== data.confirmPassword && 'PASSWORD DOES NOT MATCH',
        })
        if (data.email && data.firstName && data.lastName && regExpEmail.test(data.email) && (!data.changePassword || (data.password && data.password === data.confirmPassword)) && !data.honeypot) {
            console.log(data)
            updateCustomer(userId, data);
        }
    }
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
                <form>
                    <Typography variant="h1" component="h1">Personal Info</Typography>
                    {!error && userCreated && <Typography variant="body1">PERSONAL INFO {data.changePassword && 'AND PASSWORD'} SUCCESSFULLY UPDATED</Typography> }
                    {userCreated && <Typography variant="body1" color="error">{error}</Typography> }
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
                    {data.changePassword ? (
                        <React.Fragment>
                            <Typography style={{marginTop: '20px'}} variant="h1" component="h1">Change password</Typography>
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
                            <FormControl fullWidth style={{margin: '10px 0 20px'}}>
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
                        </React.Fragment>
                    ) : (
                        <div style={{padding: '10px 0 20px', textAlign: 'right'}}><Button disableGutters onClick={() => setData({...data, changePassword: true})}>Change password</Button></div>
                    )}
                    <label className="ohnohoney" htmlFor="name" />
                    <input className="ohnohoney" autoComplete="off" type="name" id="name" name="name" placeholder="Your name here" ref={node => () => setData({...data, honeypot: node?.value})} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Button variant="outlined" color="secondary" fullWidth onClick={handleCancel}>cancel</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color="secondary" fullWidth onClick={handleSave}>{creatingUser ? <CircularProgress size={15} /> : 'save'}</Button>
                        </Grid>
                    </Grid>
                </form>
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
    updateCustomer: updateC,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)
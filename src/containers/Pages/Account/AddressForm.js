import React from 'react'
import {FormControl, Grid, TextField} from "@material-ui/core";

const AddressForm = ({data, setData, dataError, setDataError}) => {
    const handleChange = (event, field) => {
        setDataError({...dataError, [field]: false})
        setData({...data, [field]: event.target.value})
    }
    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth style={{marginTop: '10px'}}>
                        <TextField
                            placeholder="ENTER YOUR FIRST NAME"
                            required
                            error={dataError.firstName}
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
                            error={dataError.lastName}
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
                    placeholder="ENTER YOUR COMPANY NAME"
                    error={dataError.company}
                    label="COMPANY"
                    helperText={dataError.company}
                    fullWidth
                    type="text"
                    value={data.company}
                    onChange={(event) => handleChange(event, 'company')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            <FormControl fullWidth style={{marginTop: '10px'}}>
                <TextField
                    placeholder="ENTER YOUR ADDRESS"
                    required
                    error={dataError.address}
                    label="ADDRESS"
                    helperText={dataError.address}
                    fullWidth
                    type="text"
                    value={data.address}
                    onChange={(event) => handleChange(event, 'address')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth style={{marginTop: '10px'}}>
                        <TextField
                            placeholder="ENTER YOUR CITY"
                            required
                            error={dataError.city}
                            label="CITY"
                            helperText={dataError.city}
                            fullWidth
                            type="text"
                            value={data.city}
                            onChange={(event) => handleChange(event, 'city')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth style={{marginTop: '10px'}}>
                        <TextField
                            placeholder="ENTER YOUR POST CODE"
                            required
                            error={dataError.postcode}
                            label="POST CODE"
                            helperText={dataError.postcode}
                            fullWidth
                            type="text"
                            value={data.postcode}
                            onChange={(event) => handleChange(event, 'postcode')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth style={{marginTop: '10px'}}>
                        <TextField
                            placeholder="ENTER YOUR COUNTRY"
                            required
                            error={dataError.country}
                            label="COUNTRY"
                            helperText={dataError.country}
                            fullWidth
                            type="text"
                            value={data.country}
                            onChange={(event) => handleChange(event, 'country')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth style={{marginTop: '10px'}}>
                        <TextField
                            placeholder="ENTER YOUR STATE"
                            error={dataError.state}
                            label="STATE"
                            helperText={dataError.state}
                            fullWidth
                            type="text"
                            value={data.state}
                            onChange={(event) => handleChange(event, 'state')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default AddressForm
import React from "react"
import {makeStyles, FormControl, FormControlLabel, FormGroup, Grid} from "@material-ui/core";
import Checkbox from "../../../components/Checkbox";

const CheckboxFromControl = ({options, type, setType, colors}) => {
    const useStyles = makeStyles({
        checkedLabel: {
            textDecoration: 'line-through'
        }
    })
    const classes = useStyles()
    const checked = (option, index) => type ? type === option : index === 0
    return (
        <FormControl component="fieldset" style={{width: '100%', padding: '0 3px'}}>
            <FormGroup aria-label="position" row>
                <Grid container>
                    {options.map((option, index) => (
                        <Grid key={option} item xs={6}>
                            <FormControlLabel
                                value={checked(option, index)}
                                control={
                                    <Checkbox
                                        fill
                                        checked={checked(option, index)}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                        onChange={() => setType(option)}
                                        color={colors?.filter(cl => cl.name === option)[0].description}
                                    />}
                                label={option}
                                labelPlacement="end"
                                classes={{label: checked(option, index) && colors && classes.checkedLabel}}
                            />
                        </Grid>
                    ))}
                </Grid>
            </FormGroup>
        </FormControl>
    )
}

export default CheckboxFromControl
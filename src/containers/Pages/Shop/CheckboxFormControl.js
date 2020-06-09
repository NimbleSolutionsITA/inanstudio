import React from "react"
import {FormControl, FormControlLabel, FormGroup, Grid} from "@material-ui/core";
import Checkbox from "../../../components/Checkbox";

const CheckboxFromControl = ({options, type, setType, colors}) => {
    return (
        <FormControl component="fieldset" style={{width: '100%', padding: '0 3px'}}>
            <FormGroup aria-label="position" row>
                <Grid container>
                    {options.map((option, index) => (
                        <Grid key={option} item xs={6}>
                            <FormControlLabel
                                value={type ? type === option : index === 0}
                                control={
                                    <Checkbox
                                        fill
                                        checked={type ? type === option : index === 0}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                        onChange={() => setType(option)}
                                        color={colors?.filter(cl => cl.name === option)[0].description}
                                    />}
                                label={option}
                                labelPlacement="end"
                            />
                        </Grid>
                    ))}
                </Grid>
            </FormGroup>
        </FormControl>
    )
}

export default CheckboxFromControl
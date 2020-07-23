import React from "react";
import {FormControl, TextField} from "@material-ui/core";

const TextInput = ({error, value, handleChange}) => {
    return (
        <FormControl fullWidth style={{marginTop: '10px'}}>
            <TextField
                placeholder="ENTER YOUR EMAIL"
                required
                autoComplete="email"
                error={!!error}
                label="EMAIL"
                helperText={error}
                fullWidth
                type="email"
                value={value}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </FormControl>
    )
}

export default TextInput
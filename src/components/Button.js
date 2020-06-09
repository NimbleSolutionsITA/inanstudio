import React from "react";
import {Button as MaterialButton, makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const Button = (props) => {
    const useStyles = makeStyles({
        root: {
            width: '100%',
            borderRadius: 0,
            fontSize: '12px',
        },
    });
    const classes = useStyles();
    return (
        <MaterialButton
            classes={{root: classes.root}}
            component={props.to ? RouterLink : 'button'}
            disableElevation
            {...props}
        >
            {props.children}
        </MaterialButton>
    )
}

export default Button;
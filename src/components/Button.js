import React from "react";
import {Button as MaterialButton, makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const Button = (props) => {
    const useStyles = makeStyles({
        root: {
            borderRadius: 0,
            fontSize: '10px',
            paddingRight: props.disableGutters && 0,
            paddingLeft: props.disableGutters && 0,
            paddingTop: props.disablePadding && '2px',
            paddingBottom: props.disablePadding && '2px',
            color: props.inactive && '#999',
            minWidth: '32px',
            '&:hover': {
                backgroundColor: props.disableHover && 'transparent',
            }
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
import React from "react";
import {Button as MaterialButton, makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const Button = (props) => {
    const {disableGutters, disablePadding, inactive, disableHover, children, lineThrough, ...rest} = props
    const useStyles = makeStyles({
        root: {
            borderRadius: 0,
            paddingRight: disableGutters && 0,
            paddingLeft: disableGutters && 0,
            paddingTop: disablePadding && '2px',
            paddingBottom: disablePadding && '2px',
            color: inactive && '#999',
            minWidth: '20px',
            transition: lineThrough && 'textDecoration .75s ease',
            '&:hover': rest.variant !== 'contained' && rest.variant !== 'outlined' && {
                backgroundColor: 'transparent',
                textDecoration: 'line-through'
            }
        },
    });
    const classes = useStyles();
    return (
        <MaterialButton
            classes={{root: classes.root}}
            component={props.to ? RouterLink : 'button'}
            disableElevation
            {...rest}
        >
            {children}
        </MaterialButton>
    )
}

export default Button;
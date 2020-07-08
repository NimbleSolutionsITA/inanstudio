import React from "react";
import {Link as MaterialLink, makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const Link = (props) => {
    const {isActive, disableHover, ...rest} = props
    const useStyles = makeStyles({
        root: {
            textDecoration: isActive && 'line-through',
            transition: 'textDecoration .75s ease',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'line-through'
            }
        },
    });
    const classes = useStyles();
    return (
        <MaterialLink classes={{root: classes.root}} {...rest} component={props.to ? RouterLink : 'a'}>
            {props.children}
        </MaterialLink>
    )
}

export default Link;
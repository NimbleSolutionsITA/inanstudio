import React from "react";
import {Link as MaterialLink, makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const Link = (props) => {
    const useStyles = makeStyles({
        root: {
            textDecoration: props.active && 'line-through',
            transition: 'textDecoration .75s ease',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'line-through'
            },
        },
    });
    const classes = useStyles();
    return (
        <MaterialLink classes={{root: classes.root}} {...props} component={props.to ? RouterLink : 'a'}>
            {props.children}
        </MaterialLink>
    )
}

export default Link;
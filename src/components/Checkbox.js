import React from 'react'
import clsx from 'clsx'
import {Checkbox as MuiCheckbox, makeStyles} from "@material-ui/core"

function lightenDarkenColor(col, amt) {

    let usePound;
    let color;

    if (col[0] === "#") {
        color = col.slice(1);
        usePound = true;
    }
    else {
        usePound = false
        color = col
    }

    const num = parseInt(color,16);

    const r = (num >> 16) + amt;
    let rr

    if (r > 255) rr = 255;
    else if  (r < 0) rr = 0;

    const b = ((num >> 8) & 0x00FF) + amt;
    let bb

    if (b > 255) bb = 255;
    else if  (b < 0) bb = 0;

    const g = (num & 0x0000FF) + amt;
    let gg

    if (g > 255) gg = 255;
    else if (g < 0) gg = 0;

    return (usePound?"#":"") + (gg | (bb << 8) | (rr << 16)).toString(16);

}

const Checkbox = ({color, fill, onBlack, ...rest}) => {
    const useStyles = makeStyles({
        root: {
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
        icon: {
            borderRadius: 0,
            width: 16,
            height: 16,
            boxShadow: `inset 0 0 0 2px ${((color !== '#ffffff') && color) || (onBlack ? '#fff' : '#000')}, inset 0 -2px 0 ${(color !== '#ffffff' && color) || (onBlack ? '#fff' : '#000')}`,
            'input ~ &': {
                backgroundColor: color || (onBlack ? 'transparent' : '#ebf1f5'),
            },
            'input:hover ~ &': {
                backgroundColor: color ? lightenDarkenColor(color, -10) : ( onBlack ? '#333' : '#ebf1f5' ),
            },
            'input:disabled ~ &': {
                boxShadow: 'none',
                background: 'rgba(206,217,224,.5)',
            },
        },
        checkedFillIcon: {
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
            'input ~ &': {
                backgroundColor: onBlack ? '#fff' : '#000',
            },
            '&:before': {
                display: 'block',
                width: 16,
                height: 16,
                content: '""',
            },
            'input:hover ~ &': {
                backgroundColor: onBlack ? '#ccc' : '#232323',
            },
        },
        checkedIcon: {
            backgroundColor: color,
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
            '&:before': {
                display: 'block',
                width: 16,
                height: 16,
                backgroundImage:
                    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                    " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                    "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23" + (color === '#ffffff' ? '000' : 'fff') + "'/%3E%3C/svg%3E\")",
                content: '""',
            },
            'input:hover ~ &': {
                backgroundColor: color ? lightenDarkenColor(color, -10) : '#000',
            },
        },
    });
    const classes = useStyles()
    return (
        <MuiCheckbox
            className={classes.root}
            checkedIcon={<span className={clsx(classes.icon, color ? null : classes.checkedFillIcon)} />}
            icon={<span className={classes.icon} />}
            {...rest}
        />
    )
}

export default Checkbox
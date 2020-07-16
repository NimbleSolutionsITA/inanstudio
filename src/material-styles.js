import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const primaryLight = '#fff';
const primary = '#fff';
const primaryDark = '#b3b3b3';
const secondaryLight = '#222';
const secondary = '#000';
const secondaryDark = '#000';
const grigio = '#989EA1';
const gray = '#F1F1F5';
const error = '#E3241C';

const breakpoints = createBreakpoints({
    values: {
        xs: 0,
        sm: 735,
        md: 735,
        lg: 925,
        xl: 926,
    },
});

const materialTheme = {
    palette: {
        primary: {
            main: primary,
            light: primaryLight,
            dark: primaryDark,
            contrastText: '#fff',
        },
        secondary: {
            main: secondary,
            light: secondaryLight,
            dark: secondaryDark,
        },
    },
    colors: {
        primaryLight,
        primary,
        primaryDark,
        secondaryLight,
        secondary,
        secondaryDark,
        grigio,
        gray,
        error,
    },
    breakpoints,
    typography: {
        fontFamily: [
            'Helvetica Neue',
        ].join(','),
        h1: {
            fontSize: 60,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            lineHeight: '50px',
            padding: '12px 0 2px',
            [breakpoints.down('sm')]: {
                fontSize: 40,
                padding: '8px 0 2px',
                lineHeight: '35px',
            },
        },
        h2: {
            fontSize: 15,
            padding: '5px 0',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            lineHeight: '15px',
        },
        h3: {
            fontSize: 15,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            [breakpoints.down('sm')]: {
                fontSize: 14,
            },
        },
        body1: {
            fontSize: 10,
            lineHeight: '12px',
            padding: '5px 0',
            [breakpoints.down('sm')]: {
                fontSize: 11,
            },
        },
        body2: {
            color: '#878787',
            padding: '5px 0',
            fontSize: 10,
            lineHeight: '12px',
            [breakpoints.down('sm')]: {
                fontSize: 11,
            },
        }
    },
    overrides: {
        MuiTypography: {
          colorSecondary: {
              color: '#b3b3b3'
          }
        },
        MuiDivider: {
            root: {
                backgroundColor: secondary
            },
        },
        MuiFormLabel: {
            root: {
                color: secondary,
                fontWeight: 'bold',
                fontSize: '13px',
            }
        },
        MuiInputLabel: {
            root: {
              fontSize: 10,
              [breakpoints.down('sm')]: {
                fontSize: 11,
              },
            },
            formControl: {
                top: '8px',
            },
            shrink: {
                transform: 'translate(0, 1.5px) scale(1)',
            },
        },
        MuiTableCell: {
            root: {
                padding: '5px 20px 5px 0',
            }
        },
        MuiButton: {
            root: {
                minHeight: '21px',
                paddingTop: '1px',
                paddingBottom: '1px',
                fontSize: '10px',
                [breakpoints.down('sm')]: {
                    fontSize: '11px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                },
            },
            outlined: {
                paddingTop: 0,
                paddingBottom: 0,
            },
        },
    },
};

export default materialTheme;
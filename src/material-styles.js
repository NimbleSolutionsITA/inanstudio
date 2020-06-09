import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const primaryLight = '#fff';
const primary = '#fff';
const primaryDark = '#e3e3e3';
const secondaryLight = '#222';
const secondary = '#000';
const secondaryDark = '#000';
const grigio = '#989EA1';
const gray = '#F1F1F5';
const error = '#E3241C';

const breakpoints = createBreakpoints({
    values: {
        xs: 0,
        sm: 426,
        md: 1365,
        lg: 1706,
        xl: 1920,
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
    breakpoints: {
        values: {
            xs: 0,
            sm: 320,
            md: 735,
            lg: 925,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: [
            'Helvetica Neue',
        ].join(','),
        h1: {
            fontSize: 88,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            [breakpoints.down('sm')]: {
                fontSize: 40,
            },
        },
        h2: {
            fontSize: 40,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            [breakpoints.down('sm')]: {
                fontSize: 20,
            },
        },
        h3: {
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            [breakpoints.down('sm')]: {
                fontSize: 14,
            },
        },
        body2: {
            color: '#878787',
            padding: '8px 0',
            fontSize: '10pt',
        }
    },
    overrides: {
        MuiDivider: {
            root: {
                backgroundColor: secondary
            },
        },
    },
};

export default materialTheme;
import React from "react"
import {
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles,
    Drawer, IconButton
} from "@material-ui/core"
import Link from "../../../components/Link"
import Container from "../../../components/Container"
import CloseIcon from "../../../components/svg/CloseIcon";
import {openSizeGuide} from "../../Header/actions";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            zIndex: '1 !important',
        }
    },
    drawerRoot: {
        height: '100vh',
        width: '100%',
        paddingTop: '70px',
        textTransform: 'uppercase',
        '& > div': {
            height: '100%',
        }
    },
}));

const SizeGuide = ({sizes, isMobile}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const sizeGuideOpen = useSelector(state => state.header.sizeGuideOpen)
    const handleOpen = () => {
        dispatch(openSizeGuide(true))
    };
    const handleClose = () => {
        dispatch(openSizeGuide(false))
    };

    return (
        <React.Fragment>
            <Link style={{lineHeight: '15px'}} onClick={handleOpen} color="inherit"><b>Size guide</b></Link>
            <Drawer
                classes={{root: classes.root, paper: classes.drawerRoot}}
                anchor="top"
                open={sizeGuideOpen}
                onClose={() => handleClose}
                onOpen={() => handleOpen}
            >
                <Container>
                    <div  style={{position: 'relative', marginTop: '15px'}}>
                        {!isMobile && <Divider />}
                        <Typography component="h4" variant={isMobile ? 'h2' : 'h1'} style={{padding: '5px 0'}}>Size Guide</Typography>
                        <IconButton disableRipple onClick={handleClose} style={{position: 'absolute', right: '-11px', top: isMobile ? '-7px' : '10px'}}><CloseIcon width={isMobile ? '14px' : '21px'} /></IconButton>
                    </div>
                    {isMobile ? (
                        <React.Fragment>
                            <br />
                            <br />
                            {sizes.map(row => (
                                <React.Fragment>
                                    <Divider />
                                    <Typography variant="h2">{row.title.rendered}</Typography>
                                    <Divider />
                                    <br />
                                    <Typography><b>Adjustable measures:</b> {row.acf.adj_measures}</Typography>
                                    <br />
                                    <Typography><b>Wearability:</b> {row.acf.wearability}</Typography>
                                    <br />
                                    <Typography><b>Matching size:</b> {row.acf.matching_size}</Typography>
                                    <br />
                                    <br />
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Divider style={{marginBottom: '35px'}} />
                            <TableContainer>
                                <Table  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{" "}</TableCell>
                                            <TableCell><Typography component="h3" variant="h3">Adj. measures</Typography></TableCell>
                                            <TableCell><Typography component="h3" variant="h3">Wearability</Typography></TableCell>
                                            <TableCell><Typography component="h3" variant="h3">Matching size</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sizes.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    <Typography component="h3" variant="h3">{row.title.rendered}</Typography>
                                                </TableCell>
                                                <TableCell>{row.acf.adj_measures}</TableCell>
                                                <TableCell>{row.acf.wearability}</TableCell>
                                                <TableCell>{row.acf.matching_size}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                    )}
                </Container>
            </Drawer>
        </React.Fragment>
    )
}

export default SizeGuide
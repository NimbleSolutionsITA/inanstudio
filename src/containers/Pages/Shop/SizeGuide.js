import React from "react"
import {
    Paper,
    Typography,
    Divider,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles
} from "@material-ui/core"
import Link from "../../../components/Link"
import Container from "../../../components/Container"

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: '0',
        position: 'absolute',
        top:' 50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        border: 'none',
        boxShadow: 'none',
    },
}));

const SizeGuide = ({sizes}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Link style={{lineHeight: '15px'}} onClick={handleOpen} color="inherit"><b>Size guide</b></Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="size-guide"
                aria-describedby="inan-products-size-guide"
            >
                <React.Fragment>
                    <div onClick={handleClose} style={{position: 'absolute', backgroundColor: '#fff', top: 0, left: 0, height: '100vh', width: '100vw'}} />
                    <div className={classes.paper}>
                        <Container maxWidth="md">
                            <Typography component="h4" variant="h1">Inan</Typography>
                            <Divider />
                            <Typography component="h4" variant="h1">Size Guide</Typography>
                            <Divider style={{marginBottom: '35px'}} />
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
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
                        </Container>
                    </div>
                </React.Fragment>
            </Modal>
        </React.Fragment>
    )
}

export default SizeGuide
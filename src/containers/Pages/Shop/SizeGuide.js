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

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: '0',
        position: 'absolute',
        top:' 50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: 'none',
        padding: theme.spacing(2, 4, 3),
    },
    table: {
        minWidth: 900,
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
            <Link onClick={handleOpen} color="secondary"><b>Size guide</b></Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="size-guide"
                aria-describedby="inan-products-size-guide"
            >
                <div className={classes.paper}>
                    <Typography component="h4" variant="h1">Inan</Typography>
                    <Divider />
                    <Typography component="h4" variant="h1">Size Guide</Typography>
                    <Divider />
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{" "}</TableCell>
                                    <TableCell align="right"><Typography component="h3" variant="h3">Adg. measures</Typography></TableCell>
                                    <TableCell align="right"><Typography component="h3" variant="h3">Wearability</Typography></TableCell>
                                    <TableCell align="right"><Typography component="h3" variant="h3">Matching size</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sizes.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            <Typography component="h3" variant="h3">{row.title.rendered}</Typography>
                                        </TableCell>
                                        <TableCell align="right">{row.acf.adj_measures}</TableCell>
                                        <TableCell align="right">{row.acf.wearability}</TableCell>
                                        <TableCell align="right">{row.acf.matching_size}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default SizeGuide
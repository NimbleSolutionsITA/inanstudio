import React from "react"
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, IconButton, SwipeableDrawer} from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Container from "./Container";

const RightDrawer = ({open, setOpen, children}) => {
    const headerHeight = useSelector(state => state.header.height)
    const useStyles = makeStyles(theme => ({
        drawerRoot: {
            height: window.innerHeight,
            width: '100vw',
            paddingTop: `calc(${headerHeight}px + 10px)`,
            textTransform: 'uppercase',
            zIndex:0,
            backgroundColor: 'transparent',
            [theme.breakpoints.down('sm')]: {
                backgroundColor: '#fff',
            },
        },
    }));
    const classes = useStyles()
    return (
        <SwipeableDrawer
            anchor="right"
            classes={{paper: classes.drawerRoot}}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            elevation={0}
            ModalProps={{hideBackdrop: true}}
        >
            <Container style={{height: window.innerHeight - headerHeight - 5}}>
                <Grid container justify="flex-end" spacing={2} style={{height: '100%', position: 'relative'}}>
                    <Grid item xs={12} md={4} style={{backgroundColor: '#fff', height: '100%', width:'100%', paddingTop: 0}}>
                        <IconButton onClick={() => setOpen(false)} style={{position: 'absolute', right: 0, top: 0}}><CloseOutlinedIcon /></IconButton>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </SwipeableDrawer>
    )
}

export default RightDrawer
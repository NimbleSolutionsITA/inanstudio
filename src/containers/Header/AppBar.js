import React, {forwardRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from "../../components/Link";
import {AppBar as MuiAppBar, SwipeableDrawer, Toolbar, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import BurgerIcon from "../../components/svg/BurgerIcon";
import CartIcon from "../../components/svg/CartIcon";
import INAN from "../../components/svg/INAN";
import Container from "../../components/Container";

const AppBar = forwardRef(({children, open, openDrawer, navLinks}, headerEl) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            flexGrow: 1,
            '& header': {
                borderBottom: '1px solid #000',
            }
        },
        title: {
            paddingTop: 20,
            paddingBottom: 20,
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
        toolbarIcons: {
            marginLeft: theme.spacing(1),
            transition: 'all .75s ease',
        },
        appBarRoot: {
            zIndex: theme.zIndex.modal+1,
        },
        drawerRoot: {
            height: '100vh',
            backgroundColor: '#000',
            color: '#fff',
            paddingTop: '70px',
            textTransform: 'uppercase',
        },
        drawerNavContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',

        },
        separator: {
            flexGrow: 1,
        }
    }));
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <MuiAppBar color={open ? 'secondary' : 'primary'} ref={headerEl} position="fixed" square elevation={0} classes={{root: classes.appBarRoot}}>
                <Toolbar component={Container}>
                    <IconButton edge="start" className={classes.title} color="inherit">
                        <Link to="/"><INAN height={30} color={open ? '#fff' : '#000'} /></Link>
                    </IconButton>
                    <div style={{flex: 1}} />
                    <IconButton className={classes.toolbarIcons} color="inherit" aria-label="menu">
                        <CartIcon color={open ? '#fff' : '#000'} height={20} open={open} items={3} />
                    </IconButton>
                    <IconButton onClick={() => openDrawer(!open)} edge="end" className={classes.toolbarIcons} color="inherit" aria-label="menu">
                        <BurgerIcon color={open ? '#fff' : '#000'} open={open}/>
                    </IconButton>
                </Toolbar>
                {children}
            </MuiAppBar>
            <SwipeableDrawer
                classes={{paper: classes.drawerRoot}}
                anchor="top"
                open={open}
                onClose={() => openDrawer(false)}
                onOpen={() => openDrawer(true)}
            >
                <Container style={{height: '100%'}}>
                    <List className={classes.drawerNavContainer}>
                        {navLinks.map((link, index) => (
                            <ListItem component={Link} to={link.url} disableGutters button key={link.name} onClick={() => openDrawer(false)}>
                                <ListItemText primary={link.name} />
                            </ListItem>
                        ))}
                        <ListItem component="div" style={{flexGrow: 1}} />
                        <ListItem component={Link} to="/" disableGutters button onClick={() => openDrawer(false)}>
                            <ListItemText primary="SHOPPING BAG" />
                        </ListItem>
                        <ListItem component={Link} to="/" disableGutters button onClick={() => openDrawer(false)}>
                            <ListItemText primary="WHISH LIST" />
                        </ListItem>
                        <ListItem component={Link} to="/" disableGutters button onClick={() => openDrawer(false)}>
                            <ListItemText primary="LOGIN / REGISTER" />
                        </ListItem>
                        <ListItem component={Link} to="/" disableGutters button onClick={() => openDrawer(false)}>
                            <ListItemText primary="CUSTOMER SERVICE" />
                        </ListItem>
                    </List>
                </Container>
            </SwipeableDrawer>
        </div>
    );
});

export default AppBar;
import React, {forwardRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from "../../components/Link";
import {AppBar as MuiAppBar, SwipeableDrawer, Toolbar, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import BurgerIcon from "../../components/svg/BurgerIcon";
import CartIcon from "../../components/svg/CartIcon";
import INAN from "../../components/svg/INAN";
import Container from "../../components/Container";
import InAnLogo from "../../components/svg/InAnLogo";

const AppBar = forwardRef(({children, authenticated, open, openDrawer, navLinks, cartItems, wishlistItems}, headerEl) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            flexGrow: 1,
            '& header': {
                borderBottom: '1px solid #000',
            },

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
            backgroundColor: open ? 'transparent' : '#fff',
            zIndex: theme.zIndex.modal+1,
        },
        drawerRoot: {
            height: window.innerHeight,
            width: '100%',
            backgroundColor: '#000',
            color: '#fff',
            paddingTop: '70px',
            textTransform: 'uppercase',
            '& > div': {
                height: '100%',
            }
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
            <MuiAppBar ref={headerEl} position="fixed" square elevation={0} classes={{root: classes.appBarRoot}}>
                <Toolbar component={Container}>
                    <IconButton edge="start" className={classes.title} color="inherit">
                        <Link to="/"><INAN height={30} color={open ? '#fff' : '#000'} /></Link>
                    </IconButton>
                    <div style={{flex: 1}} />
                    <IconButton className={classes.toolbarIcons} color="inherit" aria-label="menu">
                        <CartIcon color={open ? '#fff' : '#000'} height={20} open={open} items={cartItems} />
                    </IconButton>
                    <IconButton onClick={() => openDrawer(!open)} edge="end" className={classes.toolbarIcons} color="inherit" aria-label="menu">
                        <BurgerIcon color={open ? '#fff' : '#000'} open={open}/>
                    </IconButton>
                </Toolbar>
                {children}
            </MuiAppBar>
            <SwipeableDrawer
                classes={{paper: classes.drawerRoot}}
                anchor="right"
                open={open}
                onClose={() => openDrawer(false)}
                onOpen={() => openDrawer(true)}
            >
                <Container style={{height: '100%', position: 'relative'}}>
                    <List className={classes.drawerNavContainer}>
                        {navLinks.map((link, index) => (
                            <ListItem component={Link} to={link.url} disableGutters button key={link.name} onClick={() => openDrawer(false)}>
                                <ListItemText primary={link.name} />
                            </ListItem>
                        ))}
                        <ListItem component="div" style={{flexGrow: 1}} />
                        <ListItem component={Link} to="/bag" disableGutters button onClick={() => openDrawer(false)}>
                            <ListItemText primary={`SHOPPING BAG (${cartItems})`} />
                        </ListItem>
                        <ListItem component={Link} to="/wishlist" disableGutters button onClick={() => openDrawer(false)}>
                            <ListItemText primary={`WISHLIST (${wishlistItems})`} />
                        </ListItem>
                        <ListItem component={Link} to={authenticated ? '/account' : '/account/login'} disableGutters button onClick={() => openDrawer(false)}>
                            <ListItemText primary={authenticated ? 'ACCOUNT' : 'LOGIN / REGISTER'} />
                        </ListItem>
                        <ListItem component={Link} to="/customer-service" disableGutters button onClick={() => openDrawer(false)}>
                            <ListItemText primary="CUSTOMER SERVICE" />
                        </ListItem>
                    </List>
                    <div style={{position: 'absolute', bottom: '10px', right: '20px'}}>
                        <InAnLogo color="#fff" height="50px" />
                    </div>
                </Container>
            </SwipeableDrawer>
        </div>
    );
});

export default AppBar;
import React from "react";
import {useSelector} from "react-redux";
import {Divider, Grid, Typography} from "@material-ui/core";
import Container from "../../../components/Container";
import Item from "./Item";
import Button from "../../../components/Button";

const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist)
    return (
        <Container headerPadding>
            <Typography variant="h1" component="h1">WISHLIST</Typography>
            <Divider />
            <br />
            {wishlist.length ?
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        {wishlist.map(i => <Item key={i.id} itemData={i} />)}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <Grid item xs={0} lg={4} />
                            <Grid item xs={12} lg={8}>
                                <Button inactive disableGutters disablePadding to="/returns">Shipping and returns</Button><br />
                                <Button inactive disableGutters disablePadding to="/customer-service">need help?</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> :
                <Typography variant="h1" component="h1" color="secondary">THE WISHLIST IS EMPTY</Typography>
            }
        </Container>
    )
}

export default Wishlist
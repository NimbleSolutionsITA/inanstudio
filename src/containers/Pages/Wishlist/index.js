import React from "react";
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import CartItem from "../../../components/CartItem";
import SplitLayout from "../../../components/SplitLayout";

const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist)
    return (
        <Container headerPadding>
            <br />
            {wishlist.length ?
                <SplitLayout
                    left={wishlist.map(i => <CartItem key={i.id} itemData={i} />)}
                    right={
                        <React.Fragment>
                            <Button inactive disableGutters disablePadding to="/customer-service/shipping">Shipping and returns</Button><br />
                            <Button inactive disableGutters disablePadding to="/customer-service">need help?</Button>
                        </React.Fragment>
                    }
                /> :
                <Typography variant="h1" component="h1" color="secondary">THE WISHLIST IS EMPTY</Typography>
            }
        </Container>
    )
}

export default Wishlist
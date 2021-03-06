import React from "react";
import {useDispatch} from "react-redux";
import { deleteCartItem, updateCartItem, addCartItem} from "../containers/Pages/ShoppingBag/actions";
import {addWishlistItem, deleteWishlistItem, updateWishlistItem} from "../containers/Pages/Wishlist/actions";
import {Grid, Typography, Divider, IconButton} from "@material-ui/core";
import Button from "../components/Button";
import PlusIcon from "./svg/PlusIcon";
import MinusIcon from "./svg/MinusIcon";
import Link from "../components/Link";
import {formatPrice} from "../helpers";

const CartItem = ({itemData, isBag}) => {
    const dispatch = useDispatch()

    const handleRemove = () => {
        isBag ?
        dispatch(deleteCartItem(itemData.id)) :
        dispatch(deleteWishlistItem(itemData.id))
    }
    const handleUpdateQty = (newQty) => {
        isBag ?
            dispatch(updateCartItem(itemData.id, newQty)) :
            dispatch(updateWishlistItem(itemData.id, newQty))
    }
    const handleMove = () => {
        isBag ?
            dispatch(addWishlistItem(itemData.id, itemData.name, itemData.price, itemData.leather, itemData.size, itemData.color, itemData.image, itemData.slug, itemData.qty)) :
            dispatch(addCartItem(itemData.id, itemData.name, itemData.price, itemData.leather, itemData.size, itemData.color, itemData.image, itemData.slug, itemData.qty))
        handleRemove()
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Link to={`/shop/${itemData.slug}`}><img src={itemData.image} alt={itemData.name} width="100%" /></Link>
            </Grid>
            <Grid item xs={8} style={{display: "flex", flexDirection: "column", paddingBottom: 0}}>
                <Typography variant="h2">
                    {itemData.name}<br />
                    {formatPrice(itemData.price)}
                </Typography>
                <br />
                <div style={{flexGrow: '1'}}>
                    {itemData.leather && <Typography>Leather Type: {itemData.leather}</Typography>}
                    {itemData.size && <Typography>Size: {itemData.size}</Typography>}
                    {itemData.color && <Typography>Color: {itemData.color}</Typography>}
                    <br />
                </div>
                <Divider light />
                <div>
                    QUANTITY:
                    <IconButton disableRipple disabled={itemData.qty === 1} color="secondary" onClick={() => handleUpdateQty(itemData.qty-1)}>
                        <MinusIcon width="14px" />
                    </IconButton>
                    {itemData.qty}
                    <IconButton disableRipple color="secondary" onClick={() => handleUpdateQty(itemData.qty+1)}>
                        <PlusIcon width="14px" />
                    </IconButton>
                </div>
                <Divider light />
                <Typography style={{padding: '10px 0'}} variant="h2">SUBTOTAL: {formatPrice(itemData.price * itemData.qty)}</Typography>
            </Grid>
            <Grid item xs={12} style={{paddingTop: 0}}>
                <Divider light />
                <div style={{display: 'flex'}}>
                    <Button inactive onClick={handleRemove} disableGutters>Remove</Button>
                    <div style={{flexGrow: 1}} />
                    <Button inactive onClick={handleMove} disableGutters>{isBag ? 'move to wishlist' : 'add to bag'}</Button>
                </div>
                <Divider />
                <br />
                <br />
            </Grid>
        </Grid>
    )
}

export default CartItem
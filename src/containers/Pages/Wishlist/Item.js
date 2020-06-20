import React from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import { addCartItem} from "../ShoppingBag/actions";
import {deleteWishlistItem, updateWishlistItem} from "./actions";
import {Grid, Typography, Divider, IconButton} from "@material-ui/core";
import Button from "../../../components/Button";
import Link from "../../../components/Link";

const IconWrapper = styled.div`
  button {
    border-radius: 10px;
    width: 15px;
    border: 1px solid;
    margin: 5px 20px;
    padding: 0 5px;
    :focus {
      outline: none;
    }
    :hover {
     background-color: #f1f1f5;
    }
  }
`

const Item = ({itemData}) => {
    const dispatch = useDispatch()
    const formatPrice = (price) =>  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price)
    const handleRemove = () => {
        dispatch(deleteWishlistItem(itemData.id))
    }
    const handleUpdateQty = (newQty) => {
        dispatch(updateWishlistItem(itemData.id, newQty))
    }
    const handeleMoveToCart = () => {
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
                <IconWrapper>
                    QUANTITY:
                    <IconButton size="small" disabled={itemData.qty === 1} color="secondary" onClick={() => handleUpdateQty(itemData.qty-1)}>-</IconButton>
                    {itemData.qty}
                    <IconButton size="small" color="secondary" onClick={() => handleUpdateQty(itemData.qty+1)}>+</IconButton>
                </IconWrapper>
                <Divider light />
                <Typography style={{padding: '10px 0'}} variant="h2">SUBTOTAL: {formatPrice(itemData.price * itemData.qty)}</Typography>
            </Grid>
            <Grid item xs={12} style={{paddingTop: 0}}>
                <Divider light />
                <div style={{display: 'flex'}}>
                    <Button inactive onClick={handleRemove} disableGutters>Remove</Button>
                    <div style={{flexGrow: 1}} />
                    <Button inactive onClick={handeleMoveToCart} disableGutters>add to bag</Button>
                </div>
                <Divider />
                <br />
                <br />
            </Grid>
        </Grid>
    )
}

export default Item
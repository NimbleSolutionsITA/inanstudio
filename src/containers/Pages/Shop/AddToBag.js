import React, {useState} from "react"
import Button from "../../../components/Button";
import RightDrawer from "../../../components/RightDrawer";
import styled from "styled-components";
import {Typography, Grid} from "@material-ui/core";
import {addCartItem} from "../ShoppingBag/actions";
import {useDispatch, useSelector} from "react-redux";

const TitleWrapper = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid;
  margin-bottom: 10px;
`

const AddToBag = ({itemId, name, price, leather, size, color, image, slug, children = 'add to bag'}) => {
    const [open, setOpen] = useState(false)
    const qty = useSelector(state => state.cart.filter(item => item.id === itemId)[0]?.qty)
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addCartItem(itemId, name, price, leather, size, color, image, slug, 1))
        setOpen(true)
    }

    return (
        <React.Fragment>
            <Button fullWidth onClick={handleAddToCart} color="secondary" variant="contained">{children}</Button>
            <RightDrawer open={open} setOpen={setOpen}>
                <TitleWrapper>
                    <Typography variant="h3" component="h3">Added to shopping bag</Typography>
                </TitleWrapper>
                {qty &&
                    <Grid container spacing={2}>
                        <Grid style={{paddingTop: 0, marginTop: '-2px'}} item xs={6}>
                            <img width='100%' src={image} alt={name}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{name}</b></Typography>
                            <Typography><b>€ {price}</b></Typography>
                            {leather && (
                                <>
                                    <br />
                                    <Typography>Leather Type:</Typography>
                                    <Typography>{leather}</Typography>
                                </>
                            )}
                            {size && (
                                <>
                                    <br />
                                    <Typography>size:</Typography>
                                    <Typography>{size}</Typography>
                                </>
                            )}
                            {color && (
                                <>
                                    <br />
                                    <Typography>color:</Typography>
                                    <Typography>{color}</Typography>
                                </>
                            )}
                            <br />
                            <Typography>Quantity:</Typography>
                            <Typography>{qty}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth to="/bag" color="secondary" variant="outlined">View bag</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth to="/checkout" color="secondary" variant="contained">Checkout</Button>
                        </Grid>
                    </Grid>
                }
            </RightDrawer>
        </React.Fragment>
    )
}

export default AddToBag
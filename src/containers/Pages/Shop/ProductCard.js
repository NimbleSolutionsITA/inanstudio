import React, {useMemo, useCallback} from "react"
import {useDispatch} from "react-redux"
import {addWishlistItem} from "../Wishlist/actions"
import styled from "styled-components"
import {Typography} from "@material-ui/core"
import Link from "../../../components/Link"
import Button from "../../../components/Button"

const CardWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 6px;
`
const ImageWrapper = styled.div`
    flex-grow: 1;
    background-image: ${({bg}) => `url(${bg})`};
    background-size: cover;
    background-position: center;
    background-color: #e9e9e9;
    position: relative;
    button {
      position: absolute;
      top: 10px;
      right: 10px;
      opacity: 0;
      transition: opacity .25s ease;
    }
    img {
      width: 100%;
      opacity: 0;
    }
    :hover {
      background-image: ${({bgHover}) => bgHover && `url(${bgHover})`};
    }
    :hover > button {
      opacity: 1;
      z-index: 1;
    }
`
const ContentWrapper = styled.div`
  text-transform: uppercase;
  p {
      min-height: 18px;
  }
`
const Sale = styled.span`
  text-decoration: line-through;
`

const ProductCard = ({product, isMobile}) => {
    const dispatch = useDispatch()
    const handleClick = useCallback(() => {
        dispatch(addWishlistItem(
            product.id,
            product.name,
            product.price,
            product.attributes.filter(attribute => attribute.id === 3)[0]?.options[0],
            product.attributes.filter(attribute => attribute.id === 2)[0]?.options[0],
            product.acf.color?.name,
            product.images[0].src, product.slug,
            1)
        )
    },[dispatch, product.acf.color, product.attributes, product.id, product.images, product.name, product.price, product.slug])
    const queryString = product.attributes?.filter(a => a.id !== 1).reduce((acc, item) => {
        acc[item.id] = item.options[0];
        return acc;
    }, {}) || {}
    return (useMemo(() => (
        <CardWrapper>
            <ImageWrapper bg={product.images[0].woocommerce_thumbnail} bgHover={!isMobile && product.images[1].woocommerce_thumbnail}>
                {!isMobile && <Button disableHover disableGutters disableRipple onClick={handleClick}>add to wishlist</Button>}
                <Link to={`/shop/${product.slug}?${new URLSearchParams(queryString).toString()}`}><img src={product.images[0].woocommerce_thumbnail} alt={product.images[0].alt} /></Link>
            </ImageWrapper>
            <ContentWrapper>
                <Typography style={{paddingBottom: 0}} component="p" variant="body1"><b>{product.name}</b></Typography>
                <Typography style={{padding: 0}} component="p" variant="body1">
                    { product.attributes.filter(attribute => attribute.id === 3)[0]?.options.filter(opt => opt === 'Vegan')[0] && (
                        isMobile ? 'Vegan option' : 'Vegan leather option'
                    )}
                </Typography>
                <Typography component="p" variant="body1">
                    {product.on_sale ?
                        <><Sale>€ {product.regular_price}</Sale> € {product.sale_price}</> :
                        `€ ${product.price}`
                    }
                    {isMobile ? (
                        <>
                            <br />
                            {product.stock_status === 'outofstock' && ' out of stock'}
                            {product.stock_status === 'onbackorder' && ' pre order'}
                            {product.stock_quantity <= 3 && product.stock_quantity > 0 && ` only ${product.stock_quantity} in stock`}
                            {product.featured && (
                                <> <span style={{color: 'red'}}>new</span></>
                            )}
                        </>
                    ) : (
                        <>
                            {product.stock_status === 'outofstock' && ' - out of stock'}
                            {product.stock_status === 'onbackorder' && ' - pre order'}
                            {product.stock_quantity <= 3 && product.stock_quantity > 0 && ` - only ${product.stock_quantity} in stock`}
                            {product.featured && (
                                <> - <span style={{color: 'red'}}>new</span></>
                            )}
                        </>
                    ) }
                </Typography>
            </ContentWrapper>
        </CardWrapper>
    ), [handleClick, isMobile, product.attributes, product.featured, product.images, product.name, product.on_sale, product.price, product.regular_price, product.sale_price, product.slug, product.stock_quantity, product.stock_status, queryString]))
}

export default ProductCard
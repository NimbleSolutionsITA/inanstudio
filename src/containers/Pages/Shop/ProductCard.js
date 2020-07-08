import React from "react"
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
    background-size: contain;
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
      background-image: ${({bgHover}) => `url(${bgHover})`};
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
    const handleClick = () => {
        dispatch(addWishlistItem(product.id, 1))
    }
    return (
        <CardWrapper>
            <ImageWrapper bg={product.images[0].src} bgHover={product.images[1].src}>
                {!isMobile && <Button disableHover disableGutters disableRipple onClick={handleClick}>add to wishlist</Button>}
                <Link to={`/shop/${product.slug}`}><img src={product.images[0].src} alt={product.images[0].alt} /></Link>
            </ImageWrapper>
            <ContentWrapper>
                <Typography component="p" variant="body1"><b>{product.name}</b></Typography>
                <Typography component="p" variant="body1">
                    { product.attributes.filter(attribute => attribute.id === 3)[0]?.options.filter(opt => opt === 'Vegan')[0] && (
                        isMobile ? 'Vegan option' : 'Vegan leather option'
                    )}
                </Typography>
                <Typography component="p" variant="body1" style={{marginTop: '8px'}}>
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
    )
}

export default ProductCard
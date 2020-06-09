import React from "react"
import styled from "styled-components"
import {Typography} from "@material-ui/core";
import Link from "../../../components/Link";

const CardWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`
const ImageWrapper = styled.div`
    flex-grow: 1;
    transition: background-image 1.25s ease;
    background-image: ${({bg}) => `url(${bg})`};
    background-size: contain;
    background-position: center;
    background-color: #e9e9e9;
  img {
   width: 100%;
   opacity: 0;
  }
  :hover {
      background-image: ${({bgHover}) => `url(${bgHover})`};
    }
`
const ContentWrapper = styled.div`
  text-transform: uppercase;
  p {
      min-height: 1rem;
  }
`
const Sale = styled.span`
  text-decoration: line-through;
`

const ProductCard = ({product, isMobile}) => {
    return (
        <CardWrapper>
            <ImageWrapper bg={product.images[0].src} bgHover={product.images[1].src}>
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
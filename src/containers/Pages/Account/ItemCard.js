import React from "react"
import styled from "styled-components"
import {Grid, Typography, useMediaQuery, useTheme} from "@material-ui/core"
import Link from "../../../components/Link"
import {formatPrice} from "../../../helpers";

const CardWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`
const ImageWrapper = styled.div`
    flex-grow: 1;
    transition: background-image .25s ease;
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
      height: 170px;
      background-color: #e9e9e9;
    }
`
const ContentWrapper = styled.div`
  text-transform: uppercase;
  p {
      min-height: 18px;
  }
`

const ItemCard = ({product, item}) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const leatherType = item.meta_data.filter(attr => attr.key === 'pa_leather-type')[0]?.value
    const color = item.meta_data.filter(attr => attr.key === 'pa_color')[0]?.value
    const size = item.meta_data.filter(attr => attr.key === 'pa_size')[0]?.value
    return (
        <CardWrapper>
            {product &&  isMobile ? (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <img width="100%" src={product.images[0].src} alt={product.images[0].alt} />
                        </Grid>
                        <Grid item xs={7} style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography><b>
                                {product.name}<br/>
                                {formatPrice(item.price)}
                            </b></Typography>
                            <br />
                            <Typography>
                                {leatherType && `leather type: ${leatherType}`}
                                {leatherType && <br />}
                                {size && `size: ${size}`}
                                {size && <br />}
                                {color && `color: ${color}`}
                                {color && <br />}
                                {`quantity: ${item.quantity}`}
                            </Typography>
                            <div style={{minHeight: '10px', flexGrow: 1}} />
                            <Typography style={{padding: '10px 0'}}>{`subtotal: ${formatPrice(item.price * item.quantity)}`}</Typography>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <React.Fragment>
                    <ImageWrapper bg={product.images[0].src}>
                        <Link to={`/shop/${product.slug}`}><img src={product.images[0].src} alt={product.images[0].alt} /></Link>
                    </ImageWrapper>
                    <ContentWrapper>
                        <Typography component="p" variant="body1" style={{margin: '5px 0'}}>
                            <b>{product.name}</b><br />
                            <b>{formatPrice(item.price)}</b>
                        </Typography>
                        <Typography style={{fontSize: '8px'}}>
                            {leatherType && <React.Fragment>
                                LEATHER TYPE: {leatherType}<br />
                            </React.Fragment>}
                            {color && <React.Fragment>
                                COLOR: {color}<br />
                            </React.Fragment>}
                            {size && <React.Fragment>
                                SIZE: {size}<br />
                            </React.Fragment>}
                            QUANTITY: {item.quantity}
                        </Typography>
                    </ContentWrapper>
                </React.Fragment>
            )}
        </CardWrapper>
    )
}

export default ItemCard
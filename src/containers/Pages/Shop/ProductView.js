import React from "react"
import useWoocommerceData from "../../../providers/WoocommerceDataProvider"
import {useSelector} from "react-redux"
import styled from "styled-components"
import {
    Grid,
} from "@material-ui/core"
import Container from "../../../components/Container"
import VideoPlayer from "../../../components/VideoPlayer"
import Carousel from "../../../components/Carousel"
import ProductSidebar from "./ProductSidebar"
import CrossSell from "./CrossSell";

const ImageWrapper = styled.div`
  width: 100%;
  background-image: ${({bg}) => `url(${bg})`};
  background-size: cover;
  margin-bottom: 1rem;
  img {
    opacity: 0;
    width: 100%;
  }
`

const ProductView = ({prodId, colors, isMobile, sizeGuide}) => {
    useWoocommerceData(`products/${prodId}`, {})
    const product = useSelector(state => state.woocommerce[`products-${prodId}`])
    return (
        <Container>
            {product &&
            <Grid container spacing={4}>
                <Grid sm={12} md={8} item>
                    {isMobile ?
                        <Carousel
                            images={product.images}
                            poster={product.acf.video_url && product.acf.video_cover.url}
                            src={product.acf.video_url && product.acf.video_url}
                        />
                     : (
                        <React.Fragment>
                            {product.images.map(image =>
                                <ImageWrapper bg={image.src} key={image.src}>
                                    <img src={image.src} alt={image.alt} />
                                </ImageWrapper>
                            )}
                            {product.acf.video_url && (
                                <VideoPlayer
                                    poster={product.acf.video_cover.url}
                                    src={product.acf.video_url}
                                />
                            )}
                        </React.Fragment>
                    )}
                </Grid>
                <Grid sm={12} md={4} item>
                    <ProductSidebar product={product} colors={colors} isMobile={isMobile} sizeGuide={sizeGuide} />
                </Grid>
            </Grid>
            }
            {product && product.related_ids && (
                <CrossSell isMobile={isMobile} items={product.related_ids}/>
            )}
        </Container>
    )
}

export default ProductView;
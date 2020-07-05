import React from "react"
import useWoocommerceData from "../../../providers/WoocommerceDataProvider"
import {
    Grid,
} from "@material-ui/core"
import Container from "../../../components/Container"
import VideoPlayer from "../../../components/VideoPlayer"
import Carousel from "../../../components/Carousel"
import ProductSidebar from "./ProductSidebar"
import CrossSell from "./CrossSell";
import ModalImage from "../../../components/ModalImage";

const ProductView = ({products, prodId, colors, isMobile, sizeGuide}) => {
    const variations = useWoocommerceData(`products/${prodId}/variations`, {per_page: 100})
    const product = products.filter(prod => prod.id === prodId)[0]
    return (
        <React.Fragment>
            <Container>
                {product && variations &&
                <Grid container spacing={2}>
                    <Grid xs={12} md={8} item>
                        {isMobile ?
                            <Carousel
                                images={product.images}
                                poster={product.acf.video_url && product.acf.video_cover.url}
                                src={product.acf.video_url && product.acf.video_url}
                            />
                            : (
                                <div>
                                    {product.images.map(image =>
                                        <ModalImage url={image.src} key={image.src} alt={image.alt} />
                                    )}
                                    {product.acf.video_url && (
                                        <VideoPlayer
                                            poster={product.acf.video_cover.url}
                                            src={product.acf.video_url}
                                        />
                                    )}
                                </div>
                            )}
                    </Grid>
                    <Grid xs={12} md={4} item>
                        <ProductSidebar variations={variations} product={product} colors={colors} isMobile={isMobile} sizeGuide={sizeGuide} />
                    </Grid>
                </Grid>
                }
                {!isMobile && product && product.related_ids && (
                    <CrossSell isMobile={isMobile} items={product.related_ids}/>
                )}
            </Container>
            {isMobile && product && variations && product.related_ids && (
                <Container style={{borderTop: '1px solid #000', marginTop: '60px', overflow: 'hidden'}}>
                    <CrossSell isMobile={isMobile} items={product.related_ids}/>
                </Container>
            )}
        </React.Fragment>
    )
}

export default ProductView;
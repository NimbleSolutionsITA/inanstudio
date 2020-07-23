import React, {useMemo, useState} from "react"
import useWoocommerceData from "../../../providers/WoocommerceDataProvider"
import {
    Grid,
} from "@material-ui/core"
import Container from "../../../components/Container"
import Carousel from "react-multi-carousel";
import ProductSidebar from "./ProductSidebar"
import CrossSell from "./CrossSell";
import ModalImage from "../../../components/ModalImage";
import {useSelector} from "react-redux";
import VimeoPlayer from "../../../components/VideoPlayer/VimeoPlayer";

const ProductView = ({product, prodId, isMobile, sizeGuide, color, leather, size, colorVariations}) => {
    const variations = useWoocommerceData(`products/${prodId}/variations`, {per_page: 100})
    const colors = useSelector(state => state.woocommerce['color'])
    const [colorType, setColorType] = useState(product.acf.color?.name || color || null)
    const currentProduct = colorVariations.filter(cv => cv.acf.color?.name === colorType)[0] || product

    const Slider = () => {
        return (
            isMobile ?
                <Carousel
                    arrows={false}
                    showDots={true}
                    additionalTransfrom={0}
                    centerMode={false}
                    draggable
                    focusOnSelect={false}
                    infinite
                    keyBoardControl
                    minimumTouchDrag={0}
                    responsive={{
                        all: {
                            breakpoint: { max: 10000, min: 0 },
                            items: 1,
                        },
                    }}
                    slidesToSlide={1}
                    swipeable
                >
                    {currentProduct.images.map((image) =>
                        <ModalImage url={image} key={image.src} alt={image.alt} />
                    )}
                    {currentProduct.acf.video && (
                        <VimeoPlayer video={currentProduct.acf.video} autoplay={!currentProduct.acf.video_cover} cover={currentProduct.acf.video_cover.url} color="#fff" />
                    )}
                </Carousel>
                : (
                    <div>
                        {currentProduct.images.map((image) =>
                            <ModalImage url={image} key={image.src} alt={image.alt} />
                        )}
                        {currentProduct.acf.video && (
                            <VimeoPlayer video={currentProduct.acf.video} autoplay={!currentProduct.acf.video_cover} cover={currentProduct.acf.video_cover.url} color="#fff" />
                        )}
                    </div>
                )

        )
    }

    return (useMemo(() => (
        <React.Fragment>
            {currentProduct && variations && isMobile && <Slider />}
            <Container>
                {currentProduct && variations && (
                    <Grid container spacing={2}>
                        {!isMobile && (
                            <Grid xs={12} md={8} item>
                                <Slider />
                            </Grid>
                        )}
                        <Grid xs={12} md={4} item>
                            <ProductSidebar colorType={colorType} setColorType={setColorType} variations={variations} leather={leather} size={size} product={currentProduct} colors={colors} isMobile={isMobile} sizeGuide={sizeGuide} />
                        </Grid>
                    </Grid>
                )}
                {!isMobile && currentProduct && currentProduct.cross_sell_ids.length > 0 && (
                    <CrossSell isMobile={isMobile} items={currentProduct.cross_sell_ids}/>
                )}
            </Container>
            {isMobile && currentProduct && variations && currentProduct.cross_sell_ids.length > 0 && (
                <Container style={{borderTop: '1px solid #000', marginTop: '60px', overflow: 'hidden'}}>
                    <CrossSell isMobile={isMobile} items={currentProduct.cross_sell_ids}/>
                </Container>
            )}
        </React.Fragment>
    ), [colorType, colors, currentProduct, isMobile, leather, size, sizeGuide, variations]))
}

export default ProductView;
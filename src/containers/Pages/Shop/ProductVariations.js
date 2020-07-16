import React, {useMemo} from 'react'
import ProductCard from "./ProductCard";
import {Grid} from "@material-ui/core";
import useWoocommerceData from "../../../providers/WoocommerceDataProvider";

const ProductVariations = ({product, isMobile}) => {
    const variations = useWoocommerceData(`products/${product.id}/variations`, {per_page: 100})?.filter(v => v.image.src !== product.images[0].src)
    return (useMemo( () => (
        <React.Fragment>
            <Grid xs={6} md={4} item>
                <ProductCard isMobile={isMobile} product={product} />
            </Grid>
            {variations && variations.map(v => (
                <Grid key={v.image.src} xs={6} md={4} item>
                    <ProductCard
                        isMobile={isMobile}
                        product={product}
                        attributes={v.attributes}
                        variationImage={v.image.src}
                        variationPrice={v.price}
                    />
                </Grid>
            ))}
        </React.Fragment>
    ), [isMobile, product, variations]))
}

export default ProductVariations
import React from "react";
import ProductCard from "./ProductCard";
import useWoocommerceData from "../../../providers/WoocommerceDataProvider";

const CrossSellItem = ({id}) => {
    const product = useWoocommerceData(`products/${id}`)

    return (
        <React.Fragment>
            {product && <ProductCard product={product} />}
        </React.Fragment>
    )
}

export default CrossSellItem
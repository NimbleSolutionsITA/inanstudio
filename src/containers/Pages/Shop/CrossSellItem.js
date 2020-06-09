import React from "react";
import ProductCard from "./ProductCard";
import useWoocommerceData from "../../../providers/WoocommerceDataProvider";
import {useSelector} from "react-redux";

const CrossSellItem = ({id}) => {
    useWoocommerceData(`products/${id}`, {})
    const product = useSelector(state => state.woocommerce[`products-${id}`])

    return (

        <React.Fragment>
            {product && <ProductCard product={product} />}
        </React.Fragment>
    )
}

export default CrossSellItem
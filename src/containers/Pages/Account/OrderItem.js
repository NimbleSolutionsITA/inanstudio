import React from "react";
import ItemCard from "./ItemCard";
import useWoocommerceData from "../../../providers/WoocommerceDataProvider";

const OrderItem = ({id, item}) => {
    const product = useWoocommerceData(`products/${id}`)

    return (
        <React.Fragment>
            {product && <ItemCard product={product} item={item} />}
        </React.Fragment>
    )
}

export default OrderItem
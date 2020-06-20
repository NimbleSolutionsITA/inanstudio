/*
 * Shop
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import useWoocommerceData from "../../../providers/WoocommerceDataProvider";
import {useParams, useHistory, useLocation} from "react-router";
import {connect} from "react-redux";
import {useMediaQuery, useTheme} from "@material-ui/core";
import GridView from "./GridView";
import ProductView from "./ProductView";
import useWordpressData from "../../../providers/WordpressDataProvider";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Shop({headerHeight, products, categories, colors, sizeGuide}) {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    let { slug } = useParams();
    let query = useQuery();
    let history = useHistory();
    let prodId;
    useWoocommerceData('products', {})
    useWoocommerceData('products/attributes/4/terms', {})
    useWordpressData('size_guide', [])
    if(slug && products) {
        prodId = products.filter(prod => prod.slug === slug)[0]?.id
        if (!prodId) history.push('/error/product/404')
    }

    return (
        <div style={{width: !isMobile && '100vw', paddingTop: !isMobile && headerHeight, paddingBottom: '40px'}}>
            { prodId ? (
                <ProductView products={products} prodId={prodId} colors={colors} isMobile={isMobile} sizeGuide={sizeGuide} />
            ) : (
                <GridView
                    products={products}
                    activeCategory={query.get('category') || 'view-all'}
                    activeCategoryName={categories?.filter(cat => cat.slug === query.get('category'))[0]?.name || 'View all'}
                    headerHeight={headerHeight}
                    isMobile={isMobile}
                />
            ) }
        </div>
    );
}

const mapStateToProps = state => ({
    headerHeight: state.header.height,
    products: state.woocommerce.products,
    categories: state.woocommerce['products-categories'],
    colors: state.woocommerce['products-attributes-4-terms'],
    sizeGuide: state.wordpress['size-guide'],
})

export default connect(mapStateToProps)(Shop);

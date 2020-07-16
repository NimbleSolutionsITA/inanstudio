/*
 * Shop
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useMemo} from 'react';
import {useParams, useHistory, useLocation} from "react-router";
import {useSelector} from "react-redux";
import {useMediaQuery, useTheme} from "@material-ui/core";
import GridView from "./GridView";
import ProductView from "./ProductView";
import useWordpressData from "../../../providers/WordpressDataProvider";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Shop() {
    const headerHeight = useSelector(state => state.header.height)
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    let { slug } = useParams();
    const categories = useSelector(state => state.woocommerce['products-categories'])
    let query = useQuery();
    let history = useHistory();
    let prod;
    let colorVariations;
    const products = useSelector(state => state.woocommerce.products)
    const sizeGuide = useWordpressData('size_guide', [])
    if(slug && products) {
        prod= products.filter(p => p.slug === slug)[0]
        if (!prod) history.push('/error/product/404')
        colorVariations = products.filter(p => p.name === prod?.name)
    }
    return (useMemo(() => (
        <div style={{width: !isMobile && '100%', paddingTop: !isMobile && headerHeight, paddingBottom: '40px'}}>
            { prod?.id ? (
                products && <ProductView colorVariations={colorVariations} product={prod} prodId={prod.id} isMobile={isMobile} sizeGuide={sizeGuide} size={query.get('2')} color={query.get('4')} leather={query.get('3')} />
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
    ),[categories, colorVariations, headerHeight, isMobile, prod, products, query, sizeGuide]));
}

export default Shop;

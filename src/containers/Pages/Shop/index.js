/*
 * Shop
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useState} from 'react';
import useWoocommerceData from "../../../providers/WoocommerceDataProvider";
import {useParams, useHistory} from "react-router";
import {connect} from "react-redux";
import {useMediaQuery, useTheme} from "@material-ui/core";
import GridView from "./GridView";
import ProductView from "./ProductView";
import Container from "../../../components/Container";
import Filters from "./Filters";
import useWordpressData from "../../../providers/WordpressDataProvider";

function Shop({headerHeight, products, categories, colors, sizeGuide}) {
    const [activeCategory, setActiveCategory] = useState(['View all', 'view-all'])
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    let { slug } = useParams();
    let history = useHistory();
    let prodId;
    useWoocommerceData('products', {})
    useWoocommerceData('products/categories', {})
    useWoocommerceData('products/attributes/4/terms', {})
    useWordpressData('size_guide', [])
    if(slug && products) {
        prodId = products.filter(prod => prod.slug === slug)[0]?.id
        if (!prodId) history.push('/error/product/404')
    }
    console.log(sizeGuide)
    return (
        <div style={{width: !isMobile && '100vw', paddingTop: !isMobile && headerHeight, paddingBottom: '40px'}}>
            <Container>
                {
                    categories &&
                    <Filters
                        isMobile={isMobile}
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        headerHeight={headerHeight}
                    />
                }
            </Container>
            { prodId ? (
                <ProductView prodId={prodId} colors={colors} isMobile={isMobile} sizeGuide={sizeGuide} />
            ) : (
                <GridView
                    products={products}
                    categories={categories}
                    headerHeight={headerHeight}
                    isMobile={isMobile}
                >
                </GridView>
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

/*
 * Shop
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect, useMemo, useState} from 'react';
import {useParams, useHistory} from "react-router";
import {useSelector} from "react-redux";
import {useMediaQuery, useTheme} from "@material-ui/core";
import GridView from "./GridView";
import ProductView from "./ProductView";
import useWordpressData from "../../../providers/WordpressDataProvider";
import {useQuery} from "../../../helpers";

const Shop = () => {
    const headerHeight = useSelector(state => state.header.height)
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    let { slug } = useParams();
    let query = useQuery();
    let history = useHistory();
    const allCategories = useSelector(state => state.woocommerce['products-categories'])
    const allProducts = useSelector(state => state.woocommerce.products)
    const sizeGuide = useWordpressData('size_guide', [])

    const [products, setProducts] = useState(null)
    const [colorVariations, setColorVariations] = useState(null)
    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState(null)

    useEffect(() => {
        if (allCategories) {
            const currentCat = query.get('category') || 'view-all'
            setCategory(allCategories.filter(cat => cat.slug === currentCat)[0])
        }
    }, [allCategories, query])

    useEffect(() => {
        if (allProducts && category) {
            if (slug) {
                const currentProduct = allProducts.filter(p => p.slug === slug)[0]
                if (!currentProduct) history.push('/error/product/404')
                else {
                    setProduct(currentProduct)
                    setColorVariations(allProducts.filter(p => !p.acf.isTakeOver && p.name === currentProduct.name))
                    setProducts(null)
                }
            }
            else {
                setProduct(null)
                setColorVariations(null)
                setProducts(allProducts.filter(prod =>
                    !prod.acf.isTakeOver && (
                        ['view-all', 'artisanal'].includes(category.slug) ?
                            prod.categories.find(cat => cat.slug === category.slug) :
                            !prod.categories.find(cat => cat.slug === 'artisanal') && prod.categories.find(cat => cat.slug === category.slug)
                        )
                ))
            }
        }

    }, [allProducts, category, history, slug])
    console.log('Shop', product)
    return (
        <div style={{width: !isMobile && '100%', paddingTop: !isMobile && headerHeight, paddingBottom: '40px'}}>
            { product && <ProductView colorVariations={colorVariations} product={product} isMobile={isMobile} sizeGuide={sizeGuide} size={query.get('2')} leather={query.get('3')} />}
            { products &&
            <GridView
                products={products}
                activeCategoryName={category.name}
                headerHeight={headerHeight}
                isMobile={isMobile}
            />
            }
        </div>
    );
}

export default Shop;

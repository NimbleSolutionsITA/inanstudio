import {useDispatch} from 'react-redux';

import { fetchWoocommerceData } from './actions';
import useWordpressData from "../WordpressDataProvider";

function useData() {
    const dispatch = useDispatch();

    dispatch(fetchWoocommerceData('products', 'products', {per_page: 100}));
    dispatch(fetchWoocommerceData('products-categories', 'products/categories', {}));
    dispatch(fetchWoocommerceData('color', 'products/attributes/4/terms', {}));
    dispatch(fetchWoocommerceData('leather', 'products/attributes/3/terms', {}));
    dispatch(fetchWoocommerceData('size', 'products/attributes/2/terms', {}));
    dispatch(fetchWoocommerceData('continents', 'data/continents', {}));
    dispatch(fetchWoocommerceData('shipping-EU-locations', 'shipping/zones/1/locations', {}));
    dispatch(fetchWoocommerceData('shipping-W-locations', 'shipping/zones/3/locations', {}));
    dispatch(fetchWoocommerceData('shipping-R', 'shipping/zones/0/methods/12', {}));
    dispatch(fetchWoocommerceData('shipping-EU', 'shipping/zones/1/methods/9', {}));
    dispatch(fetchWoocommerceData('shipping-IT', 'shipping/zones/2/methods/5', {}));
    dispatch(fetchWoocommerceData('shipping-W', 'shipping/zones/3/methods/6', {}));
    dispatch(fetchWoocommerceData('shipping-GIFT', 'shipping/zones/5/methods/13', {}));
    useWordpressData('news_feed', [])
}

export default useData;
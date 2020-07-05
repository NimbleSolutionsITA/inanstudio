import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

import { fetchWoocommerceData } from './actions';

function useWoocommerceData(APIPath, params) {
  const [key] = useState(_.kebabCase(APIPath));

  const dispatch = useDispatch();

  const data = useSelector(state => state.woocommerce[key])

  useEffect(() => {
    if (!data)
      dispatch(fetchWoocommerceData(key, APIPath, params));
  }, [APIPath, data, dispatch, key, params]);
  return data;
}

export default useWoocommerceData;

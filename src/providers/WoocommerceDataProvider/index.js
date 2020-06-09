import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import _ from 'lodash';

import { fetchWoocommerceData } from './actions';

const makeWoocommerceDataSelector = () =>
  createSelector(
    (state, key) => state.woocommerce[key],
    (__, ___, fallback) => fallback,
    (data, fallback) => data || fallback,
  );

function useWoocommerceData(APIPath, fallback = {}) {
  const [key] = useState(_.kebabCase(APIPath));

  const dispatch = useDispatch();
  const selectWoocommerceData = useMemo(makeWoocommerceDataSelector, []);

  useEffect(() => {
    dispatch(fetchWoocommerceData(key, APIPath));
  }, [APIPath, dispatch, key]);
  return useSelector(state => selectWoocommerceData(state, key, fallback));
}

export default useWoocommerceData;

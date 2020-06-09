import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import _ from 'lodash';

import { fetchWordpressData } from './actions';

const makeWordpressDataSelector = () =>
  createSelector(
    (state, key) => state.wordpress[key],
    (__, ___, fallback) => fallback,
    (data, fallback) => data || fallback,
  );

function useWordpressData(APIPath, fallback = {}) {
  const [key] = useState(_.kebabCase(APIPath));

  const dispatch = useDispatch();
  const selectWordpressData = useMemo(makeWordpressDataSelector, []);

  useEffect(() => {
    dispatch(fetchWordpressData(key, APIPath));
  }, [APIPath, dispatch, key]);
  return useSelector(state => selectWordpressData(state, key, fallback));
}

export default useWordpressData;

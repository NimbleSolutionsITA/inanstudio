import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

import { fetchWordpressData } from './actions';

function useWordpressData(APIPath = {}) {
  const [key] = useState(_.kebabCase(APIPath));

  const dispatch = useDispatch();

  const data = useSelector(state => state.wordpress[key])

  useEffect(() => {
    if(!data)
      dispatch(fetchWordpressData(key, APIPath));
  }, [APIPath, data, dispatch, key]);
  return data;
}

export default useWordpressData;

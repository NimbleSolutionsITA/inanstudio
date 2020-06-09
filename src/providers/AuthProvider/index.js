import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';


import { login } from './actions';

const makeUserDataSelector = () =>
  createSelector(
    (state) => state.user,
    (__, fallback) => fallback,
    (data, fallback) => data || fallback,
  );

function useAuthData( username, password, fallback = {}) {

  const dispatch = useDispatch();
  const selectUserData = useMemo(makeUserDataSelector, []);

  useEffect(() => {
    dispatch(login(username, password));
  }, [username, dispatch, password]);
  return useSelector(state => selectUserData(state, fallback));
}

export default useAuthData;

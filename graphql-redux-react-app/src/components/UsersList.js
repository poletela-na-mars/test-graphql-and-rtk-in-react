import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { addUser } from '../redux/usersSlice';
import { GET_USER } from '../graphql/queries';

export const UsersList = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (data) {
      data.users.forEach(user => dispatch(addUser(user)));
    }
  }, [data, dispatch]);

  return (
      loading
          ? <h1>Loading</h1>
          : error
              ? <h1>Error: {error.message}</h1>
              : (<><h1>Users List</h1><p>Data: {data}</p></>)
  );
};
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/usersSlice';
import { CREATE_USER } from '../graphql/mutations';

export const CreateUserForm = () => {
  const dispatch = useDispatch();
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (formData) => {
    const { data } = await createUser({ variables: formData });
    dispatch(addUser(data.createUser));
  };

  // Render the form and handle submission using handleSubmit
};
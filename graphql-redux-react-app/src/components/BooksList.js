import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { GET_BOOKS } from '../graphql/queries';

import './BooksList.css';

export const BooksList = () => {
  // const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_BOOKS);

  console.log(data?.getBooks)

  console.log(error?.networkError.result.errors)


  // useEffect(() => {
  //   if (data) {
  //     data.books.forEach(book => dispatch(addBook(book)));
  //   }
  // }, [data, dispatch]);

  return (
      loading
          ? <h1>Loading</h1>
          : error
              ? <h1>Error: {error.message}</h1>
              : (
                  <div className='BooksList-container'>
                    <h1>Books List</h1>
                    <ul>
                      {
                        data.getBooks.map((book, idx) => <li key={idx}>{book.title} {book.author} {book.price}</li>)
                      }
                    </ul>
                  </div>
              )
  );
};
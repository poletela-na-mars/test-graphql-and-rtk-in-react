import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

import { DELETE_BOOK } from '../graphql/mutations';
import { GET_BOOKS } from '../graphql/queries';

import { AddBookForm } from './AddBookForm';

import './Books.css';

export const BooksList = () => {
  let { data, loading, error } = useQuery(
      GET_BOOKS
  );
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [
      GET_BOOKS,
      'GetBooks'
    ],
  });
  const [searchData, setSearchData] = useState({ author: '', title: '' });

  // TODO - add search
  // const executeSearch = () => {
  //   data.getBooks = data.getBooks.filter((book) => (searchData.author ? book.author.toLowerCase().trim().indexOf(searchData.author) >= 0 : true) &&
  //       (searchData.title ? book.title.toLowerCase().trim().indexOf(searchData.title) >= 0 : true));
  // };

  const handleChange = (e) => {
    setSearchData(oldValues => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleDeleteBook = async (e, id) => {
    await deleteBook({
      variables: {
        id: id,
      }
    });
  };

  return (
      <div className='BooksList-container'>
        {
          <>
            <h1>Books List</h1>

            <div className='BooksList-search'>
              <h3>Search for the book</h3>
              <label htmlFor='author-search'>Enter author:</label>
              <input value={searchData.author} type='search' id='author-search' name='author'
                     onChange={handleChange} />

              <label htmlFor='title-search'>Enter title:</label>
              <input value={searchData.title} type='search' id='title-search' name='title'
                     onChange={handleChange} />

              <button
                  // onClick={executeSearch}
              >Search
              </button>
            </div>

            {
              loading
                  ? <h1>Loading</h1>
                  : error
                      ? <h1>Error: {error.message}. {error?.networkError.result.errors}</h1>
                      : <table>
                        <thead>
                        <tr>
                          <th>Id</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Price</th>
                          <th>Delete Book</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          data.getBooks.map((book) =>
                              <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td>
                                  <button onClick={(e) => handleDeleteBook(e, book.id)}>❌</button>
                                </td>
                              </tr>
                          )
                        }
                        </tbody>
                      </table>
            }
            <AddBookForm />
          </>
        }
      </div>
  );
};

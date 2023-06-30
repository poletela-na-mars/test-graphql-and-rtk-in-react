import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

import { DELETE_BOOK } from '../graphql/mutations';
import { FILTER_BOOKS, GET_BOOKS } from '../graphql/queries';

import { AddBookForm } from './AddBookForm';

import './Books.css';

export const BooksList = () => {
  const [searchData, setSearchData] = useState({ author: '', title: '' });
  const allBooks = useQuery(GET_BOOKS);
  const [filterBooks, filteredBooks] = useLazyQuery(FILTER_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [
      GET_BOOKS,
      'GetBooks'
    ],
  });

  const executeSearch = async () => {
    const author = searchData.author.trim().toLowerCase(), title = searchData.title.trim().toLowerCase();
    await filterBooks({ variables: { author: author, title: title } });
  };

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
                  onClick={executeSearch}
              >Search
              </button>
            </div>

            {
              allBooks.loading || filteredBooks.loading
                  ? <h1>Loading</h1>
                  : allBooks.error || filteredBooks.error
                      ? <h1>Error: {allBooks.error.message ||
                          filteredBooks.error.message}. {allBooks.error?.networkError.result.errors ||
                          filteredBooks.error?.networkError.result.errors}</h1>
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
                          (filteredBooks.data?.filterBooks != null ? filteredBooks.data.filterBooks :
                              allBooks.data.getBooks).map((book) =>
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

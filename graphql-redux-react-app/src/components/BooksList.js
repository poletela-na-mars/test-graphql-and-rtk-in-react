import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { FILTER_BOOKS } from '../graphql/queries';

import './BooksList.css';

export const BooksList = () => {
  let [executeSearch, { data, loading, error }] = useLazyQuery(
      FILTER_BOOKS
  );
  const [searchData, setSearchData] = useState({ author: '', title: '' });

  useEffect(() => {
    executeSearch();
  }, []);

  const handleChange = (e) => {
    setSearchData(oldValues => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
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

              <label htmlFor='site-search'>Enter title:</label>
              <input value={searchData.title} type='search' id='title-search' name='title'
                     onChange={handleChange} />

              <button
                  onClick={() =>
                      executeSearch({
                        variables: { author: searchData.author, title: searchData.title }
                      })}
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
                          <th>Title</th>
                          <th>Author</th>
                          <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          data?.filterBooks.map((book) =>
                              <tr key={book.key}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                              </tr>
                          )
                        }
                        </tbody>
                      </table>
            }
          </>
        }
      </div>
  );
};
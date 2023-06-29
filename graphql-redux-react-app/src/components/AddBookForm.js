import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../graphql/mutations';

import { GET_BOOKS } from '../graphql/queries';

import './Books.css';

export const AddBookForm = () => {
  const [bookData, setBookData] = useState({ author: '', title: '', price: '', id: '' });
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      GET_BOOKS,
      'GetBooks'
    ],
  });

  const handleChange = (e) => {
    setBookData(oldValues => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({
      variables: {
        author: bookData.author.trim(),
        title: bookData.title.trim(),
        price: Number(bookData.price.trim()),
        id: bookData.id.trim(),
      }
    });
    setBookData({ author: '', title: '', price: '', id: '' });
  };

  return (
      <form className='BooksList-add' onSubmit={handleSubmit}>
        <h3>Add the book</h3>
        <label htmlFor='id-add'>Enter id:</label>
        <input value={bookData.id} type='search' id='id-add' name='id'
               onChange={handleChange} />

        <label htmlFor='author-add'>Enter author:</label>
        <input value={bookData.author} type='search' id='author-add' name='author'
               onChange={handleChange} />

        <label htmlFor='title-add'>Enter title:</label>
        <input value={bookData.title} type='search' id='title-add' name='title'
               onChange={handleChange} />

        <label htmlFor='price-add'>Enter price:</label>
        <input value={bookData.price} type='search' id='price-add' name='price'
               onChange={handleChange} />

        <button type='submit' disabled={!bookData.id || !bookData.author || !bookData.price || !bookData.title}>
          Add book
        </button>
      </form>
  );
};
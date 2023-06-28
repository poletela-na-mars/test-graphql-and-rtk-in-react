import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booksSlice';
import { CREATE_BOOK } from '../graphql/mutations';

import './BooksList.css';
import { useState } from 'react';

export const AddBookForm = () => {
  const dispatch = useDispatch();
  const [bookData, setBookData] = useState({ author: '', title: '', price: '', id: '' });
  const [createBook] = useMutation(CREATE_BOOK);

  const handleChange = (e) => {
    setBookData(oldValues => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createBook({
      variables: {
        author: bookData.author.toLowerCase().trim(),
        title: bookData.title.toLowerCase().trim(),
        price: bookData.price,
        id: bookData.id.trim(),
      }
    });
    const disp = await dispatch(addBook(data.createBook));
    console.log(disp)
  };

  return (
      <form className='BooksList-search'>
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

        <button type='submit' onSubmit={handleSubmit}
            // onClick={() =>
            //     executeSearch({
            //       variables: {
            //         author: bookData.author.toLowerCase().trim(),
            //         title: bookData.title.toLowerCase().trim(),
            //         price: bookData.price,
            //         id: bookData.id.trim(),
            //       }
            //     })}
        >Add book
        </button>
      </form>
  );

};
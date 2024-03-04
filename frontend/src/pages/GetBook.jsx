import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useParams } from 'react-router-dom';

const GetBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-col'>
      <img
        className='h-96 w-full rounded-t-lg object-cover md:h-50 md:w-50 md:rounded-none md:rounded-l-lg'
        src={book.image}
        alt=''
      />
      <div className='flex flex-col justify-start p-6'>
        <h5 className='mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50'>
          {book.title}
        </h5>
        <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
          {book.description}
        </p>
        <p className='text-xs text-neutral-500 dark:text-neutral-300'>
          {book.genre}
        </p>
      </div>
    </div>
  );
};

export default GetBook;

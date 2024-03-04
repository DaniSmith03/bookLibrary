import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
        console.log(books);
        response.data.data.map((item) => console.log(item.title));
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <Link to='/users/signUp'>
        <h2>Sign Up</h2>
      </Link>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Library</h1>
        <Link to='/books/select'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {books.map((item) => (
            <Link to={`/books/details/${item._id}`}>
              <div
                className=' container sm flex flex-col items-center border-solid border-4 border-emerald-500 rounded-lg'
                key={item._id}
              >
                <h3>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

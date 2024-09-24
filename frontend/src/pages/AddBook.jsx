import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner'; // Ensure this exists or remove the import
// import { Link, useParams } from 'react-router-dom'; // Not needed unless you're using them
import '../app.css';
import { Link, useNavigate } from 'react-router-dom';
import BookDetails from './BookDetails';

const AddBook = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('talia+hibbert');

  const navigate = useNavigate();

  // Fetch the books whenever the query changes
  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/library/search-book/${query}`)
        .then((response) => {
          setBooks(response.data); // Set the books data
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [query]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery(search); // Trigger the search
  };

  return (
    <div className='container mx-auto p-4'>
      <form onSubmit={handleSearchSubmit} className='max-w-md mx-auto mb-6'>
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update search state
            className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search Books'
            required
          />
          <button
            type='submit'
            className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Search
          </button>
        </div>
      </form>

      {/* Display the loading spinner if loading */}
      {loading && <Spinner />}

      {/* Display books in a grid if not loading */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {books.length > 0
          ? books.map((book, index) => (
              <div
                key={index}
                className='relative bg-white p-4 rounded-lg shadow-lg flex flex-col group'
                onClick={() =>
                  navigate(`/search/details/${book.isbn}`, { state: { book } })
                }
              >
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'>
                  <button className='bg-green-500 text-white text-2xl p-4 rounded-full hover:bg-green-600'>
                    +
                  </button>
                </div>

                {/* Container to hold title and author, fixed height */}
                <div className='h-24 flex flex-col justify-center self-center'>
                  <h3 className='text-lg font-bold mb-2'>{book.title}</h3>
                  <p className='text-gray-700 mb-2'>Author: {book.author}</p>
                </div>

                {/* Book cover or placeholder */}
                {book.cover !== 'no image' ? (
                  <img
                    src={book.cover}
                    alt={`${book.title} cover`}
                    className='w-40 h-64 object-fit self-center'
                  />
                ) : (
                  <div className='w-40 h-64 flex items-center justify-center self-center bg-gray-200 text-gray-500'>
                    No image
                  </div>
                )}
              </div>
            ))
          : !loading && <p>No books found.</p>}
      </div>
    </div>
  );
};

export default AddBook;

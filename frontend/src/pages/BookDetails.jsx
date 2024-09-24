import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { isbn } = useParams(); // Get the isbn from the URL
  const navigate = useNavigate();

  const [book, setBook] = useState(null); // Book data state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the book details based on ISBN when the component mounts
  useEffect(() => {
    if (isbn) {
      axios
        .get(`http://localhost:5000/library/search-book/details/${isbn}`) // Adjust API endpoint as needed
        .then((response) => {
          setBook(response.data); // Set the fetched book data
          console.log(book);
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          console.error(error);
          setError('Could not fetch book details.');
          setLoading(false); // Stop loading if there's an error
        });
    } else {
      navigate('/'); // If no ISBN is provided, navigate back to home
    }
  }, [isbn, navigate]);

  // Render loading spinner, error message, or book details
  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='container mx-auto p-4'>
      {book ? (
        <div>
          <h1 className='text-2xl font-bold mb-4'>{book.title}</h1>
          <p className='text-lg mb-2'>Author: {book.author}</p>
          <img
            src={book.cover !== 'no image' ? book.cover : 'fallback-image.jpg'}
            alt={`${book.title} cover`}
            className='w-40 h-64 object-cover'
          />
          {/* Add more book details as needed */}
        </div>
      ) : (
        <p>No book details available.</p>
      )}
    </div>
  );
};

export default BookDetails;

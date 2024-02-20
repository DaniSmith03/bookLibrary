import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/users')
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //   const onSubmit=(e)=>{
  //      useEffect(() => {

  //        axios
  //          .post('http://localhost:5000/users/signUp',{
  //             firstName: e.target.
  //          })
  //          .then((response) => {
  //            setUsers(response.data.data);
  //            setLoading(false);
  //          })
  //          .catch((error) => {
  //            console.log(error);
  //            setLoading(false);
  //          });
  //      }, []);

  //   }
  const onClick = (e) => {
    console.log('Form Submitted');
  };

  return (
    <div>
      <div className='w-full max-w-xs'>
        <form
          onSubmit={onClick}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <div className='flex items-center justify-evenly'>
            {/* <label
              className='block text-gray-700 text-sm font-bold mb-2'
              for='username'
            >
              Username
            </label> */}
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='first'
              type='text'
              placeholder='First '
            />
            {/* <label
              className='block text-gray-700 text-sm font-bold mb-2'
              for='username'
            >
              Username
            </label> */}
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='last'
              type='text'
              placeholder='Last'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              for='username'
            >
              Username
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='Username'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              for='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='text'
              placeholder='Email'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              for='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='******************'
            />
            <p className='text-red-500 text-xs italic'>
              Please choose a password.
            </p>
          </div>
          <div className='flex items-center justify-evenly'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Sign In
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Sign Up
            </button>
          </div>
          <div className='flex items-center justify-evenly'>
            <a
              className='mt-5 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 '
              href='#'
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className='text-center text-gray-500 text-xs'>
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

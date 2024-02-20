import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import GetUser from './pages/GetUser';
import EditUser from './pages/EditUser';
import DeleteUser from './pages/DeleteUser';
import AddBook from './pages/AddBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import GetBook from './pages/GetBook';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/users/signUp' element={<AddUser />} />
      <Route path='/users/profile/:id' element={<GetUser />} />
      <Route path='/users/edit/:id' element={<EditUser />} />
      <Route path='/users/delete/:id' element={<DeleteUser />} />

      <Route path='/books/select' element={<AddBook />} />
      <Route path='/books/details/:id' element={<GetBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  );
};

export default App;

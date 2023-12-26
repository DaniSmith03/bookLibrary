import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import signUp from './pages/signUp';
import UserProfile from './pages/UserProfile';
import EditUser from './pages/EditUser';
import DeleteUser from './pages/DeleteUser';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={Home} />
      <Route path='/users/signUp' element={signUp} />
      <Route path='/users/profile/:id' element={UserProfile} />
      <Route path='/users/edit/:id' element={EditUser} />
      <Route path='/users/delete/:id' element={DeleteUser} />
    </Routes>
  );
};

export default App;
